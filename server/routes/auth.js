const router = require('express').Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const { query, body } = require('express-validator');
const canShowRegistrationForm = require('../middlewares/guards/canShowRegistrationForm');
const errorHandler = require('../middlewares/errorHandler');
const handleError = require('../helpers/handleError');
const isExpiredInvitation = require('../helpers/isExpiredInvitation');
const Invite = require('../models/invite');
const User = require('../models/user');

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
      return res.status(302).end();
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
], errorHandler, async (req, res, next) => {
  const { firstName, lastName, email, password, token } = req.body;
  let invitation, newUser;

  // 1. Find invitation by token and email
  try {
    invitation = await Invite.findOne({ token, email });

    if (!invitation) {
      return handleError.custom(res, 403, 'Invalid invitation');
    }
  } catch (error) {
    return handleError.custom(res, 403, error);
  }

  // 2. Check token expiration
  if (isExpiredInvitation(invitation.created)) {
    return handleError.custom(res, 403, 'Invitation is expired');
  }

  // 3. Create user
  try {
    newUser = new User({
      firstName,
      lastName,
      email,
      role: invitation.role,
      password
    });

    newUser.password = await bcrypt.hash(password, 13);
    await newUser.save();


  } catch (error) {
    return handleError.custom(res, 403, error);
  }

  // 4. Remove invitation
  try {
    await invitation.remove();
  } catch (error) {
    // log
  }

  // 5. Redirect to home page
  //res.redirect('/auth/login');
  res.status(302).end();
});

module.exports = router;
