const passport = require('passport');

module.exports = (router) => {
  /**
   * Logout using google
   */
  router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
  }));
};
