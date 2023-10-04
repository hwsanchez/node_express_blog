const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });

    if (user) {
      const same = await bcrypt.compare(password, user.password);
      if (same) {
        // If the password matches, store the session
        req.session.userId = user._id;
        console.log("Password is correct!");
        res.redirect("/");
      } else {
        console.log("Wrong password!");
        res.redirect("/auth/login");
      }
    } else {
      console.log("User does not exist!");
      res.redirect("/auth/login");
    }
  } catch (error) {
    console.error(error);
    res.redirect("/auth/login");
  }
};
