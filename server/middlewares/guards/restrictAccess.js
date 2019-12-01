module.exports = (req, res, next) => {
  console.log(req.isAuthenticated());
  if (!req.isAuthenticated()) return res.redirect('/auth/login');
  next();
}