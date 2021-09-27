// Import Modules
const http = require('http');
const fs = require('fs');

// Create the Server with the request listener function
const server = http.createServer((req, res) => {

    // Get request url and method
    const url = req.url;
    const method = req.method;

    // If the requested url is '/' then return an html form as response 
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title><head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end(); // Return to not execute the next code since that will lead to error
    }

    // If the requested url is '/message' and the method is Post then redirect 
    // to the index page after writing the dummy message to file 

    if (url === '/message' && method === 'POST') {
        fs.writeFileSync('message.txt', 'DUMMY');
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end(); 
    }

    // This code will execute if the url doesn't match the cases above
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title><head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);
