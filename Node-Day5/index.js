const Joi = require('joi');
const mongoose = require('mongoose');
const config = require("config");
const users = require('./routes/users');
const posts = require('./routes/posts');
const auth = require('./routes/auth');
const express = require('express');
const app = express();

// if (!config.get("jwtPrivateKey")){
//   console.log("JWT Private Key not defined");
//   process.exit(1);
// }
mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/posts', posts);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));