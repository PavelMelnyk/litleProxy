'use strict';

var http = require('http');
var url = require('url');
var fs = require('fs');
var stream = require( "stream" );

var path = 'cache.txt';

var proxy = function(request, response) {
    var checkCache = function(callback) {
        fs.stat(path, function(err) {
            if(err) {
                return callback(null, function(proxyResponse) {
                    var cacheStream = fs.createWriteStream(path);

                    proxyResponse.pipe(cacheStream);
                    proxyResponse.pipe(response);
                })
            }

            fs.createReadStream(path).pipe(response);

            callback(null, function(proxyResponse) {
                var cacheStream = fs.createWriteStream(path);

                proxyResponse.pipe(cacheStream);
            })
        });
    };

    var makeRequest = function(err, processResponse) {
        console.log('req to url (',request.url,')');

        var parsedUrl = url.parse(request.url);
        var options = {
            port: parsedUrl.port,
            hostname: parsedUrl.hostname,
            method: request.method,
            path: parsedUrl.path,
            headers: request.headers
        };
        var proxyRequest = http.request(options, processResponse);

        request.pipe(proxyRequest);
    };

    checkCache(makeRequest);
};

http.createServer(proxy).listen(3000);