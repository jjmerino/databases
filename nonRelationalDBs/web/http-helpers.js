var path = require('path');
var http = require('http');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};




exports.fetchPageAsync = function(url){
  var options = {
    hostname: url,
    port: 80,
    path: '/',
    method: 'GET'
  };
  console.log('Start fetching');

  var req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    var data = '';
    res.on('data', function (chunk) {
        data += chunk;
      });
    res.on('end',function(){
      archive.archiveUrl(url,data,Date.now()).then(function() {
        console.log("hello we are totes promisified");
      });
    });

  });
  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  req.end();
}
