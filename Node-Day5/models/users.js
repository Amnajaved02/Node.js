const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 10,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1050
  }
});
userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({_id: this._id},"mySecretKey");
  return token;
}
const Users = mongoose.model('Users', userSchema);

function validateUsers(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(10).max(50).required().email(),
    password: Joi.string().min(3).max(255).required()
  });
  const validation = schema.validate(user);
  return validation;
}


exports.Users = Users; 
exports.validate = validateUsers;