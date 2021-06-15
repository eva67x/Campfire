// Requires
const http = require('http');
const url = require('url');

// Create the server.
http.createServer(function (req, res) {
    let queryObject = url.parse(req.url,true).query; //  Query Object
    let path = url.parse(req.url,true).path.split("?")[0];
  
    res.writeHead(200, {'Content-Type': 'text/html'}); // We're sending HTML data here.
    res.end(`Path: ${path}<br/>Query: ${JSON.stringify(queryObject)}`);
  }).listen(8080); // Listen on PORT 8080.