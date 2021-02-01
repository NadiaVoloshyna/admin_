const { check, body } = require('express-validator');
const User = require('../../models/user');
const { USER_ROLES } = require('../../../common/constants');
const handle400 = require('../../middlewares/errorHandlers/handle400');

module.exports = (router) => {
  router.patch('/:id/role', [
    check('id').isMongoId(),
    body('role').isIn([
      USER_ROLES.ADMIN,
      USER_ROLES.AUTHOR,
      USER_ROLES.REVIEWER,
    ]),
  ], handle400, async (req, res) => {
    const { role } = req.body;
    const { id } = req.params;

    try {
      await User.updateOne(
        { _id: id },
        { role },
      );
    } catch (error) {
      return req.handle500(error);
    }

    res.status(200).end();
  });
};
