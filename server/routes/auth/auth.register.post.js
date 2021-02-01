const bcrypt = require('bcrypt');
const { body } = require('express-validator');
const Invite = require('../../models/invite');
const User = require('../../models/user');
const GoogleApi = require('../../services/google');
const isExpiredInvitation = require('../../helpers/isExpiredInvitation');
const handle400 = require('../../middlewares/errorHandlers/handle400');
const { USER_ROLES } = require('../../../common/constants');
const { GOOGLE_USER_ROLES } = require('../../constants');
const { logger } = require('../../services/gcp/logger');

module.exports = (router) => {
  // Register user
  router.post('/register', [
    body('firstName').exists().escape(),
    body('lastName').exists().escape(),
    body('email').exists().isEmail().escape(),
    body('password').exists().escape(),
    body('token').exists().escape(),
  ], handle400, async (req, res) => {
    const { firstName, lastName, email, password, token } = req.body;
    let invitation;
    let newUser;

    // 1. Find invitation by token and email
    try {
      invitation = await Invite.findOne({ token, email });

      if (!invitation) {
        return req.handle403('Invalid invitation.');
      }
    } catch (error) {
      return req.handle403(error);
    }

    // 2. Check token expiration
    if (isExpiredInvitation(invitation.created)) {
      return req.handle403('Invitation is expired.');
    }

    // 3. Create view permission for all person documents if admin or super
    if (invitation.role === USER_ROLES.ADMIN || invitation.role === USER_ROLES.SUPER) {
      try {
        await GoogleApi.createPermission(
          process.env.GOOGLE_DOC_ROOT_FOLDER_ID,
          GOOGLE_USER_ROLES.READER,
          email,
        );
      } catch (error) {
        return req.handle500(error);
      }
    }

    // 4. Create user
    try {
      newUser = new User({
        firstName,
        lastName,
        email,
        role: invitation.role,
        password,
      });

      newUser.password = await bcrypt.hash(password, 13);
      await newUser.save();
    } catch (error) {
      return req.handle403(error);
    }

    // 5. Remove invitation
    try {
      await invitation.remove();
    } catch (error) {
      logger.error(error);
    }

    // 6. Redirect to home page
    res.status(302).end();
  });
};
