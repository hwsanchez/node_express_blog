const User = require("../models/User.js");
const path = require("path");

module.exports = async (req, res) => {
  try {
    await User.create(req.body);
    res.redirect("/");
  } catch (error) {
    console.log("There was an error creating the user: " + error)
    res.redirect("/auth/register");
  }
};
