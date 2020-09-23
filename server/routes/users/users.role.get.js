const { query } = require('express-validator');
const User = require('../../models/user');
const { USER_ROLES } = require('../../constants');
const handle400 = require('../../middlewares/errorHandlers/handle400');

module.exports = (router) => {
  router.get('/role', [
    query('role').isIn([
      USER_ROLES.AUTHOR,
      USER_ROLES.REVIEWER
    ])
  ], handle400, async (req, res) => {
    const { role } = req.query;

    try {
      const documents = await User.find({ role, active: true });
      const users = documents.map(item => item.toJson());

      res.status(200).send(users);
    } catch (error) {
      req.handle500(error);
    }
  });
};
