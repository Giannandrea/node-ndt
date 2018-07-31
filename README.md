# node-ndt
unofficial NDT client for nodejs

## Introduction

Currently, this project just provides simple NDT client useful to perform speedtest of your internet connection.  

Key points of this module is the ability to run on multiple nodejs version currently every nodejs version running ws@5.0.0.0 can support this modeule in the right way.
Tested on nodejs version > 6.9.x. 
We found some problems running on node 0.10.x using ws@1.1.5 for buffer size issues.

## Usage

    node ndt.js

## result example
```json
 {
  "annotations": {
    "platform": "darwin"
  },
  "data_format_version": "0.2.0",
  "measurement_start_time": "2018-07-31 13:03:29",
  "report_id": "1530626824934",
  "software_name": "domotz_speed_test",
  "software_version": "1.0.0",
  "test_keys": {
    "advanced": {
      "avg_rtt": "30.40",
      "max_rtt": "63",
      "min_rtt": "24"
    },
    "server_infos": {
      "failure": null,
      "server_address": "ndt.iupui.mlab1.mil03.measurement-lab.org"
    },
    "simple": {
      "download": 77.81841574421388,
      "fastest_test": "server_infos",
      "ping": "30.40",
      "upload": 31.826
    },
    "test_c2s": [],
    "test_s2c": []
  },
  "test_name": "ndt",
  "test_runtime": "10.00",
  "test_start_time": "2018-07-31 13:03:29",
  "test_version": "1.0"
}
```    
    
## Installation
    
    git clone https://github.com/Giannandrea/node-ndt.git
    npm install --prefix .
    node ndt.js

## License

This module is released under the MIT license.

## Bugs

See <https://github.com/Giannandrea/node-ndt/issues>.
