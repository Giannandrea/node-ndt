NDTjs = require('./ndt_client');

'use strict';

function NDTWrapper(hostname, port, callbacks, protocol, path, update_interval) {
    this.hostname = hostname
    this.port = port
    this.path = path || '/ndt_protocol'
    this.protocol = protocol || "ws"
    this.update_interval = 1000 || 1000
    this.callbacks = callbacks
}

NDTWrapper.prototype.run_test = function() {
      var client = new NDTjs(this.hostname, this.port, this.protocol,
        this.path, this.callbacks,
        this.update_interval);
    client.startTest();
};

module.exports = NDTWrapper;