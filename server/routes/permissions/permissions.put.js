const { body, check } = require('express-validator');
const Permissions = require('../../models/permissions');
const handle400 = require('../../middlewares/errorHandlers/handle400');

// 1. update permissions
const updatePermission = async (req, res) => {
  const { permitted, attributes } = req.body;
  const { id } = req.params;

  try {
    await Permissions.updateOne(
      { _id: id },
      { permitted, attributes },
      { multi: true },
    );
  } catch (error) {
    return req.handle500(error);
  }

  res.status(200).end();
};

module.exports = (router) => {
  router.put('/:id', [
    check('id').isMongoId(),
    body('permitted').if(body('permitted').exists()).isBoolean(),
    body('attributes').if(body('attributes').exists()).isArray(),
  ],
  handle400,
  updatePermission);
};
