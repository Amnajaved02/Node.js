const {Users, validate} = require('../models/users');
const _ = require('lodash');
const bcrypt = require("bcrypt");
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) {
    return res.status(400).send(error.details[0].message)
    };

  let user = await Users.findOne({email: req.body.email})
  if (user) {
    return res.status(400).send("User Exists!")
    };

  user = new Users({ 
      name: req.body.name,
      email: req.body.email,
      password: req.body.password 
    });

  user = new Users(_.pick(req.body,['name','email','password']));
  const salt = await bcrypt.genSalt(5);
  user.password = await bcrypt.hash(user.password,salt);
  
  user = await user.save();
  const token = user.generateAuthToken();
  res.header('x-auth-token',token).send(_.pick(user,['_id','name','email']));
});

module.exports = router;