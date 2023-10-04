const User = require("../models/User");

module.exports = (req, res, next) => {
  const userId = req.session.userId;

  if (userId) {
    User.findById(userId)
      .then((user) => {
        if (user) {
          req.user = user; // Attach the user object to the request
        }
        next(); // Continue processing the request
      })
      .catch((error) => {
        console.error(error);
        next(); // Continue processing the request even if there's an error
      });
  } else {
    next(); // Continue processing the request if no user ID is found in the session
  }
};
