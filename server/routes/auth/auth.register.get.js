const { query, validationResult } = require('express-validator');
const { Invite } = require('../../models');
const isExpiredInvitation = require('../../helpers/isExpiredInvitation');

const canShowRegistrationForm = async (req, res, next) => {
  const { token } = req.query;
  const errors = validationResult(req);

  // token is invalid, redirect to login
  if (errors.array().length) {
    return res.redirect('/auth/login');
  }

  try {
    const invitation = await Invite.findOne({ token });

    // Check if invitation exist
    if (!invitation) {
      throw new Error('Invalid invitation'); // TODO: improve the message
    }

    // Check invite expiration
    if (isExpiredInvitation(invitation.created)) {
      throw new Error('Invitation is expired');
    }
  } catch (error) {
    res.locals.statusCode = 403;
    res.locals.errorMessage = error.message;
  }

  next();
};

module.exports = (router) => {
  // Render registration form
  router.get('/register', [
    query('token', 'Token is invalid')
      .exists()
      .escape()
      .custom(value => value.length === 32)
  ], canShowRegistrationForm);
};
