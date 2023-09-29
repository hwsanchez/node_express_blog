const User = require("../models/User.js");
const path = require("path");

module.exports = async (req, res) => {
  try {
    await User.create(req.body);
    res.redirect("/");
  } catch (error) {
    next(error); //Let the error propagate to the global error handler middleware
  }
};
