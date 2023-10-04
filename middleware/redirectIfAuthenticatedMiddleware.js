module.exports = (req, res, next) => {
  if (req.session.userId) {
    console.log('User already loged! Redirecting to Home')
    return res.redirect('/')
  }
  next()
}