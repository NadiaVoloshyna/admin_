const { param } = require('express-validator');
const User = require('../../models/user');
const handle400 = require('../../middlewares/errorHandlers/handle400');

const checkPermissions = (req, res, next) => {
  const { user } = req;
  // Admin or super
  const canRead = user.read('user');

  if (canRead === false) {
    return res.status(403).end();
  }

  next();
};

const findUser = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });

    if (!user) {
      return req.handle404();
    }

    res.status(200).send(user.toObject());
  } catch (error) {
    req.handle500(error);
  }
};

module.exports = (router) => {
  router.get('/:id', [
    param('id').isMongoId()
  ],
  handle400,
  checkPermissions,
  findUser);
};
