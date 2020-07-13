const { body, check } = require('express-validator');
const Asset = require('../../models/asset');
const handle400 = require('../../middlewares/errorHandlers/handle400');
const { ASSET_ACTIONS } = require('../../constants');

module.exports = (router) => {
  /**
   * Update asset
   * @param action String
   */
  router.put('/:id', [
    check('id').exists().isMongoId(),
    body('action').exists().isIn([ASSET_ACTIONS.MOVE]),
    body('parentId').exists(),
  ], handle400, async (req, res) => {
    const { id } = req.params;
    const { action, parentId } = req.body;
    try {
      if (action === ASSET_ACTIONS.MOVE) {
        await Asset.findOneAndUpdate({ _id: id }, { parent: parentId });

        return res.status(200).end();
      }

      return req.handle400('Invalid action.');
    } catch (error) {
      req.handle500(error);
    }
  });
};
