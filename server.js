
var http = require("http");
var fs = require("fs");

const PORT = 8080;

var handleRequest = function(request, response) {
    console.log("REQUEST: " + request.url);
    fs.readFile(__dirname + request.url, function(error, data) {
        response.end(data);
    });
};

var server = http.createServer(handleRequest);

server.listen(PORT, function() {
    console.log("Server listening at http://localhost:" + PORT);
});
