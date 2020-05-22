const passport = require('passport');

module.exports = (router) => {
  router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) { return res.status(403).send('Unauthorized'); }
      if (!user) { return res.status(403).send('Unauthorized'); }
      req.logIn(user, function(err) {
        if (err) { return res.status(403).send('Unauthorized'); }
        return res.status(302).end();
      });
    })(req, res, next);
  });
}