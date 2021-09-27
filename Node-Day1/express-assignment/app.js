const express = require('express');

const app = express();

// app.use((req,res,next)=>{
//     console.log("First Middleware");
//     next();
// });

// app.use((req,res,next)=>{
//     console.log("Second Middleware");
//     res.send('<h1>Express.js Assignment : First Task</h1>')
// });


app.use('/user',(req,res)=>{
    console.log("in user middleware");
    // res.send('<h1>Express.js Assignment : Second Task</h1>')
});

app.use('/',(req,res)=>{
    console.log("in / Middleware");
    res.send('<h1>Express.js Assignment : Second Task</h1>')
});


app.listen(5000);