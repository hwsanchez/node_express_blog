const mongoose = require("mongoose");
//Models are defined with the Schema interface
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String
});

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
