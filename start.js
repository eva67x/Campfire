// Requires
const http = require('http');
const url = require('url');
const mainconfig = require('./config/main.json');
const fs = require('fs');

// Create the server.
http.createServer(function (req, res) {
    let queryObject = url.parse(req.url,true).query; //  Query Object
    let path = url.parse(req.url,true).path.split("?")[0];

    res.writeHead(200, {'Content-Type': 'text/html'}); // We're sending HTML data here.

    if(mainconfig.servermode == "directory") {
        if(path == "/") {
            res.end(fs.readFileSync("www/index.html"));
        } else if (fs.readdirSync("www").includes(path.substr(1,path.length))) {
            res.end(fs.readFileSync("www" + path));
        } else {
            res.end(fs.readFileSync("internal/404.html"));
        }
    } else if(mainconfig.servermode == "maintenance") {
        res.end(fs.readFileSync("internal/maintenance.html"));
    } else {
        res.end('A supported mode was not chosen.');
    }
  }).listen(mainconfig.port); // Listen.