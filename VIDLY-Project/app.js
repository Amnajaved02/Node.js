// Import Modules
const Joi = require("joi");
const express = require("express");
const genres_routes = require("./routes/genres");
const home = require("./routes/home");

const app = express()

app.use(express.json());
app.use('/api/genres',genres_routes);
app.use('/',home);



app.listen(5000);