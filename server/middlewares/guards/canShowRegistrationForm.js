const { validationResult } = require('express-validator');
const { Invite } = require('../../models');
const isExpiredInvitation = require('../../helpers/isExpiredInvitation');

module.exports = async (req, res, next) => {
  const errors = validationResult(req);

  if (errors.array().length) {
    next(errors.array()[0].msg);
    return;
  }

  const { token } = req.query;
  let invitation;

  if (!token || token.length !== 32) {
    return res.redirect('/auth/login');
  }

  try {
    invitation = await Invite.findOne({ token });

    // Check if invitation exist
    if (!invitation) {
      throw new Error('Invalid invitation');
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
