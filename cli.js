#!/usr/bin/env node

'use strict'

var pkg = require('./package.json');
var NodeNdt = require('./ndt');


function p_exit(error) {
    if (error)
        console.error(error.message);
    var status = error ? 0 : 1;
    process.exit(status);
    return;
}

function cli_parser(args) {
    if (args[2] && (args[2] == '-h' || args[2] == '--help')) {
        var help = pkg.description +"\n  node-ndt (run just the command) \n   --version: to see node-ndt's current version.";
        console.log(help);
        p_exit();
    }
    if (args[2] && (args[2] == '-v' || args[2] == '--version')) {
        console.log(pkg.version);
        p_exit();
    }
}

var args = process.argv;
cli_parser(args);

var cb_alter = {
    'onfinish': function (passed_results) {
        process.stdout.write(JSON.stringify(passed_results));
        p_exit();
    }
}

try {
    NodeNdt.run_test(cb_alter);
} catch (error) {
    p_exit(error.message);
}
