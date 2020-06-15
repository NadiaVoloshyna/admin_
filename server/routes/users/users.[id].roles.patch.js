const User = require('../../models/user');
const { check, body } = require('express-validator');
const errorHandler = require('../../middlewares/errorHandler');
const handleError = require('../../helpers/handleError');
const { USER_ROLES } = require('../../constants');

module.exports = (router) => {
  router.patch('/:id/role', [
    check('id').isMongoId(),
    body('role').isIn([
      USER_ROLES.ADMIN,
      USER_ROLES.AUTHOR,
      USER_ROLES.REVIEWER
    ])
  ], errorHandler, async (req, res) => {
    const { role } = req.body;
    const { id } = req.params;
  
    try {
      await User.updateOne(
        { _id: id },
        { role }
      );
    } catch (error) {
      return handleError.custom(res, 500, error);
    }

    res.status(200).end();
  });
}