const Asset = require('../../models/asset');
const User = require ('../../models/user');
const { check } = require('express-validator');
const handleError = require('../../helpers/handleError');
const errorHandler = require('../../middlewares/errorHandler');
const ac = require('../../../accesscontrol.config');

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
  ], errorHandler, async (req, res) => {
    const { id } = req.params;

    try {
      // 1. Delete assert
      const user = await User.findOne({_id: id}); 
      let permission = ac.can(user.role).deleteAny('person');
      
       if (permission.granted === false) {  
        return res.status(403).end();  
      }

      const asset = await Asset.findOne({ _id: id });
      await asset.remove();

      // 2. Delete cloudinary asset
      // TODO
      return res.status(200).end();
    } catch (error) {
      return handleError.custom(res, 500, error);
    }
  });
}