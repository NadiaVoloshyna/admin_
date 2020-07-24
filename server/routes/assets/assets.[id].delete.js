const { check } = require('express-validator');
const Asset = require('../../models/asset');
const handle400 = require('../../middlewares/errorHandlers/handle400');
const ac = require('../../../accesscontrol.config');

const checkPermissions = (req, res, next) => {
  const { user } = req;
  const canDelete = ac.can(user.role).deleteAny('assets').granted;

  if (!canDelete) return res.status(403).end();

  next();
};

const deleteAssets = async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Delete assert
    const asset = await Asset.findOne({ _id: id });

    if (asset.references) {
      return res.status(409).end();
    }

    await asset.remove();

    // 2. Delete cloudinary asset
    // TODO
    return res.status(200).end();
  } catch (error) {
    req.handle500(error);
  }
};

module.exports = (router) => {
  /**
  * Delete one or multiple assets
  * 1. Delete asset
  *   a. if user is super admin delete assets
  *   b. otherwise mark as deleted
  * 2. Delete cloudinary asset
  */
  router.delete('/:id', [
    check('id').exists().isMongoId(),
  ],
  handle400,
  checkPermissions,
  deleteAssets);
};
