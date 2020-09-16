const { check } = require('express-validator');
const Permissions = require('../../models/permissions');
const handle400 = require('../../middlewares/errorHandlers/handle400');

// 1. delete permissions
const deletePermission = async (req, res) => {
  const { id } = req.params;

  try {
    await Permissions.deleteOne({ _id: id });
  } catch (error) {
    return req.handle500(error);
  }

  res.status(200).end();
};

module.exports = (router) => {
  router.delete('/:id', [
    check('id').isMongoId(),
  ],
  handle400,
  deletePermission);
};
