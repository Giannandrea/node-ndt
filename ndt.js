//var request = require('request');
var http = require('http');
var url = require('url');
WebSocket = require('ws');
var os = require('os');
NDTWrapper = require('./ndt_wrapper');

var NodeNdt = function NodeNdt() {
    function json_result_formatter(results, start_date, server) {
        final_json = {}
        final_json["annotations"] = {
            "platform": os.platform()
        };
        final_json["data_format_version"] = "0.2.0";
        final_json["measurement_start_time"] = start_date;
        final_json["report_id"] = "1530626824934";
        final_json["software_name"] = "domotz_speed_test";
        final_json["software_version"] = "1.0.0";
        final_json["test_keys"] = {
            "advanced": {
                "avg_rtt": results["avgrtt"],
                "max_rtt": results["MaxRTT"],
                "min_rtt": results["MinRTT"]
            },
            "server_infos": {
                "failure": null,
                "server_address": server
            },
            "simple": {
                "download": results['s2cRate'] / 1000,
                "fastest_test": "server_infos",
                "ping": results["avgrtt"],
                "upload": results['c2sRate'] / 1000
            },
            "test_c2s": [],
            "test_s2c": []
        };
        final_json["test_name"] = "ndt";
        final_json["test_runtime"] = results["timesec"];
        final_json["test_start_time"] = start_date;
        final_json["test_version"] = "1.0";
        return final_json;
    };

    function onstart_cb(server, onstart_call) {
        this.server = server;
        this.now = new Date().toISOString().replace('T', ' ').substr(0, 19);
        if (onstart_call)
            onstart_call(server)
    };

    function onfinish_cb(results, onfinish_call) {
        var final_json = json_result_formatter(results, this.now, this.server)
        if (onfinish_call) 
            onfinish_call(final_json);
        else
            console.log(JSON.stringify(final_json));
        return
    };

    function onerror_cb(error_message, onerror_call) {
        console.log(error_message);
        if (onerror_call)
            onerror_call(error_message);
    };

    function generate_callback(overwriting_callbacks) {
        var callbacks = {
            'onstart': function (server) {
                var onstart_call;
                if (overwriting_callbacks && overwriting_callbacks["onstart"])
                    onstart_call = overwriting_callbacks["onstart"]
                onstart_cb(server, onstart_call);
            },
            'onstatechange': function (state, results) {
                if (overwriting_callbacks && overwriting_callbacks["onstatechange"])
                    overwriting_callbacks["onstatechange"](state, results)
            },
            'onfinish': function (passed_results) {
                var onfinish_call;
                if (overwriting_callbacks && overwriting_callbacks["onfinish"])
                    onfinish_call = overwriting_callbacks["onfinish"]
                onfinish_cb(passed_results, onfinish_call);
            },
            'onprogress': function (state, results) {
                if (overwriting_callbacks && overwriting_callbacks["onprogress"])
                    overwriting_callbacks["onprogress"](state, results)
            },
            'onerror': function (error_message) {
                var onerror_call;
                if (overwriting_callbacks && overwriting_callbacks["onerror"])
                    onerror_call = overwriting_callbacks["onerror"]
                onerror_cb(error_message, onerror_call);
            }
        };
        return callbacks;
    };

    function find_ndt_server(callback) {
        var request = http.get("http://mlab-ns.appspot.com/ndt?format=json", function (response) {
            var body = "";
            response.on("data", function (chunk) {
                body += chunk;
            });
            response.on("end", function () {
                if (response.statusCode === 200) {
                    try {
                        var profile = JSON.parse(body);
                        var mlab_server_metro = JSON.parse(body).url;
                        var parsed_url_hostnamename = url.parse(mlab_server_metro, true).hostname;
                        var clientNDTWrapper = new NDTWrapper(parsed_url_hostnamename, 3001, generate_callback(callback))
                        clientNDTWrapper.run_test()
                    } catch (error) {
                        console.error(error.message);
                    }
                } else {
                    console.error("There was an error getting mlab server");
                }
            });
        });
    };
    this.run_test = function (callback) {
        find_ndt_server(callback);
        return;
    };
};
module.exports = new NodeNdt();