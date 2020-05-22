const passport = require('passport');

module.exports = (router) => {
    /**
   * Logout using google redirect route
   */
  router.get('/google/redirect', 
  passport.authenticate('google', { failureRedirect: '/auth/login' }), 
  (req, res) => res.redirect('/')
  );
}