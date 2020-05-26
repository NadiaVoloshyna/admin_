const Asset = require('../../models/asset');
const { query } = require('express-validator');
const handleError = require('../../helpers/handleError');
const errorHandler = require('../../middlewares/errorHandler');

module.exports = (router) => {
  /**
 * Get assets
 */
router.get('/', [
    query('parent').if(query('parent').exists()).isMongoId()
  ], errorHandler, async (req, res) => {
    const { parent } = req.query;
    const query = parent
      ? { parent }
      : { parent: { $exists: false } };

    // Get asset from database
    try {
      const asset = await Asset.find(query);
      
      res.status(200).send(asset)
    } catch (error) {
      return handleError.custom(res, 500, error);
    }
  });
}