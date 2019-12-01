const router = require('express').Router();
const passport = require('passport');
const { query, body } = require('express-validator');
const canShowRegistrationForm = require('../middlewares/guards/canShowRegistrationForm');
const errorHandler = require('../middlewares/errorHandler');
const registerUser = require('../controllers/user/registerUser');

/**
 * Logout user
 */
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/auth/login');
});

/**
 * Logout using google
 */
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

/**
 * Logout using google redirect route
 */
router.get('/google/redirect', 
  passport.authenticate('google', { failureRedirect: '/auth/login' }), 
  (req, res) => res.redirect('/')
);

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return res.status(403).send('Unauthorized'); }
    if (!user) { return res.status(403).send('Unauthorized'); }
    req.logIn(user, function(err) {
      if (err) { return res.status(403).send('Unauthorized'); }
      return res.redirect('/');
    });
  })(req, res, next);
});

// Render registration form
router.get('/register', [
  query('token', 'Token is invalid')
    .exists()
    .escape()
    .custom(value => value.length === 32)
], canShowRegistrationForm);

// Register user
router.post('/register', [
  body('firstName').exists().escape(),
  body('lastName').exists().escape(),
  body('email').exists().isEmail().escape(),
  body('password').exists().escape(),
  body('token').exists().escape()
], errorHandler, registerUser);

module.exports = router;