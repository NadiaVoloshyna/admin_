const { param } = require('express-validator');
const User = require('../../models/user');
const handle400 = require('../../middlewares/errorHandlers/handle400');

module.exports = (router) => {
  router.get('/:id', [
    param('id').isMongoId()
  ], handle400, async (req, res) => {
    try {
      const user = await User.findById({ _id: req.params.id });
      res.status(200).send(user);
    } catch (error) {
      req.handle500(error);
    }
  });
};
