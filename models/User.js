const mongoose = require('mongoose');
const md5 = require('md5');
const validator = require('validator');
const mongooseErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true, 
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please supply an email address'
  },
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true
  }
})

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongooseErrorHandler);

module.exports = mongoose.model('User', userSchema);