const { query } = require('express-validator');
const User = require('../../models/user');
const errorHandler = require('../../middlewares/errorHandler');
const handleError = require('../../helpers/handleError');
const { USER_ROLES } = require('../../constants');

module.exports = (router) => {
  router.get('/role', [
    query('role').isIn([
      USER_ROLES.ADMIN,
      USER_ROLES.AUTHOR,
      USER_ROLES.REVIEWER
    ])
  ], errorHandler, async (req, res) => {
    const { role } = req.query;

    try {
      const documents = await User.find({ role });
      const users = documents.map(item => item.toJson());

      res.status(200).send(users);
    } catch (error) {
      handleError.custom(res, 500, error);
    }
  });
};
