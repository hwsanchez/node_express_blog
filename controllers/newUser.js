module.exports = (req, res) => {
  var username = "";
  var password = "";
  var firstname = "";
  var lastname = "";
  const data = req.flash('data')[0];
  console.log("NEW USER CARAJOOO: ", data)

  if (typeof data != "undefined") {
    username = data.username;
    firstname = data.firstname;
    lastname = data.lastname;
    password = data.password;


  }
  

  res.render('register', {
    errors: req.flash('validationErrors'),
    username: username,
    firstname: firstname,
    lastname: lastname,
    password: password
  })
};
