const User = require("../models/User.js");

module.exports = async (req, res) => {
  try {
    await User.create(req.body);
    res.redirect("/");
  } catch (error) {
    // We map through the error.errors array keys and for each access the key's error message property
    const validationErrors = Object.keys(error.errors).map(
      (key) => error.errors[key].message)
    req.flash('validationErrors', validationErrors);
    req.flash('data', req.body);
    res.redirect('/auth/register');
  }
};
