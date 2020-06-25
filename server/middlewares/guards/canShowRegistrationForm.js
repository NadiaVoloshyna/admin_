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

  // Get the invite
  try {
    invitation = await Invite.findOne({ token });

    if (!invitation) {
      throw new Error('Invalid invitation');
    }
  } catch (error) {
    return next(error);
  }

  // Check invite expiration
  if (isExpiredInvitation(invitation.created)) {
    return next(new Error('Invitation is expired'));
  }

  next();
};
