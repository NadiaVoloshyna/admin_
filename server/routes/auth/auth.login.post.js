const passport = require('passport');

module.exports = (router) => {
  router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user) => {
      if (err || !user) return req.handle401('Unauthorized');

      req.logIn(user, (err) => {
        if (err) return req.handle401('Unauthorized');
        return res.status(302).end();
      });
    })(req, res, next);
  });
};
