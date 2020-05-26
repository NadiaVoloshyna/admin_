const Asset = require('../../models/asset');
const Cloudinary = require('../../services/cloudinary');
const { body, check } = require('express-validator');
const handleError = require('../../helpers/handleError');
const errorHandler = require('../../middlewares/errorHandler');

module.exports = (router) => {
    /**
   * Update asset
   * @param action String
   * @param payload Object
   */
  router.put('/:id', [
    check('id').exists().isMongoId(),
    body('action').exists().isIn(['move']),
    body('payload').exists(),
  ], errorHandler, async (req, res) => {
    const { id } = req.params;
    const { action, payload } = req.body;

    try {
      if (action === 'move') {
        await Asset.findOneAndUpdate({ _id: id }, { parent: payload.parentId });

        return res.status(200).end();
      } else {
        return handleError.custom(res, 400, new Error('Bad request'));
      }
    } catch (error) {
      return handleError.custom(res, 500, error);
    }
  })
}