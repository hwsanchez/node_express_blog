const mongoose = require("mongoose");
//Models are defined with the Schema interface
const Schema = mongoose.Schema;

//the unique-validator for mongoose makes sure there are not 2 users w the same username.
var uniqueValidator = require('mongoose-unique-validator')

const bcrypt = require('bcrypt')

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please provide username'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please provide password']
  },
  firstname: {
    type: String,
    required: [true, 'Please provide a first name']
  },
  lastname: {
    type: String,
    required: [true, 'Please provide a lastname']
  }
});

UserSchema.plugin(uniqueValidator);

// bcrypt:
UserSchema.pre('save', function (next) {
  const user = this
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash
    next()
  })
})

//We access the database via mongoose.model: the first argument is the name of the collection
const User = mongoose.model("User", UserSchema);

// We need to export the variable so is accesible to other files.
module.exports = User;
