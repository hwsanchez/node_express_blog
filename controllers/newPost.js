module.exports = (req, res) => {
  if (req.session.userId) {
    res.render("create", {
      //Boolean variable which will only be true when the user is logged AND creates a new post.
      createPost: true
    });
  } else {
    res.redirect("/auth/login");
  }
};
