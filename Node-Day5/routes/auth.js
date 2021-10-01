const {Users} = require('../models/users');
const config = require("config");
const _ = require('lodash');
const bcrypt = require("bcrypt");
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const jwt = require('jsonwebtoken');


router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) {
    return res.status(400).send(error.details[0].message)
    };

  let user = await Users.findOne({email: req.body.email})
  if (!user) {
    return res.status(400).send("Incorrect username or password")
    };

  const passwordvalid = await bcrypt.compare(req.body.password,user.password);
  if (!passwordvalid){
    return res.status(400).send("Incorrect username or password")
  }
    const token = user.generateAuthToken();
    res.send(token);
});


function validate(user) {
    const schema = Joi.object({
      email: Joi.string().min(10).max(50).required().email(),
      password: Joi.string().min(3).max(255).required()
    });
    const validation = schema.validate(user);
    return validation;
};

module.exports = router;