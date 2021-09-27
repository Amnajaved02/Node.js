const http = require('http');

function rqlistener(req, res){
    console.log(req)

    // Sends HTTPS header , status 200
    res.writeHead(200, {'Content-Type': 'text/plain'});
   
    // Send the response body as "Hello World"
    res.end('Hello World\n')
}

// This server takes request listener as an argument
// If a request comes execute rqlistener. Event driven nature
http.createServer(rqlistener).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');