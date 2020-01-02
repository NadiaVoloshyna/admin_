const bcrypt = require('bcrypt');
const Invite = require('../../models/invite');
const User = require('../../models/user');
const handleError = require('../../helpers/handleError');
const isExpiredInvitation = require('../../helpers/isExpiredInvitation');

/**
 * 1. Find invitation by token and email
 * 2. Check token expiration
 * 3. Create user
 * 4. Remove invitation
 * 5. Redirect to home page ???
 */
module.exports = async (req, res, next) => {
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
}