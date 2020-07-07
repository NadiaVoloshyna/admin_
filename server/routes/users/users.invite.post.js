const { body } = require('express-validator');
const cryptoRandomString = require('crypto-random-string');
const User = require('../../models/user');
const Invite = require('../../models/invite');
const mailer = require('../../services/mailer');
const { USER_ROLES } = require('../../constants');
const { template, subject } = require('../../services/mailer/templates/inviteUser');
const handle400 = require('../../middlewares/errorHandlers/handle400');

module.exports = (router) => {
  /**
   * Invite user
   * 1. Check if this email already exist
   * 2. Generate token
   * 3. Save the invite
   * 4. Send invite email
   */
  router.post('/invite', [
    body('email').escape().isEmail(),
    // TODO: uncomment in prod
    // body('email').escape().isEmail().normalizeEmail(),
    body('role').escape().isIn([
      USER_ROLES.ADMIN,
      USER_ROLES.AUTHOR,
      USER_ROLES.REVIEWER
    ])
  ], handle400, async (req, res) => {
    const { email, role } = req.body;
    const token = cryptoRandomString({ length: 32, type: 'url-safe' });
    let user;

    try {
      // Check if email exists
      user = await User.findOne({ email });

      if (user) {
        return req.handle409('User with this email is already exist');
      }

      // Save the invite
      user = await Invite({
        email,
        role,
        token,
      }).save();
    } catch (error) {
      return req.handle500(error);
    }

    try {
      await mailer({
        template: template(token, role),
        to: email,
        subject: subject()
      });
    } catch (error) {
      return req.handle500(error);
    }

    res.status(200).end();
  });
};
