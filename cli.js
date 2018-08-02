#!/usr/bin/env node

'use strict'

var dns = require('dns');
var meow = require('meow');
var pkg = require('./package.json');
var NodeNdt = require('./ndt');


function p_exit(error) {
    if (error)
        console.error(error.message);
    var status = error ? 0 : 1;
    process.exit(status);
    return;
}

// Check connection
dns.lookup('mlab-ns.appspot.com', err => {
    if (err && err.code === 'ENOTFOUND') {
        p_exit(err);
    }
});

var cli = meow(`
  node-ndt (run just the command)
    --version: to see node-ndt's current version.
`, {
    alias: {
        version: pkg.version
    }
})

var cb_alter = {
    'onfinish': function (passed_results) {
        console.log(passed_results);
        p_exit();
    }
}

try {
    NodeNdt.run_test(cb_alter);
} catch (error) {
    p_exit(error.message);
}
