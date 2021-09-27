const http = require('http');
const express = require('express');

const app = express();

// Middlewares

app.use('/firstmw',(req,res,next) => {
    console.log("In middleware 2");
    //res.write("<h1>Hello World from Express.js</h1>");
    //next();
    res.send("<h1>Hello from middleware 2</h1>");
});


app.use('/secondmw',(req,res,next) => {
    console.log("In middleware 3")
    res.send("<h1>Hello from middleware 3</h1>");
    // res.write("<p>Inside Second Middleware</p>")
    // res.end()
    // res.send("<h1>Hello World from Express.js</h1>")
});

app.use('/',(req,res,next) => {
    console.log("In middleware 1");
    res.send("<h1>Hello World from Express.js</h1>");
    // next();
});

app.listen(8000)