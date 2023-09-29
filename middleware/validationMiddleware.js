//My Custom Middleware to check if the form has empty fields:
const validateMiddleWare = (req, res, next) => {
  if (
    req.files == null ||
    req.body.title == null ||
    req.body.body == null ||
    req.body.username == null
  ) {
    return res.redirect("/posts/new");
  }
  next();
};
