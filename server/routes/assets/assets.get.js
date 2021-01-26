const { query } = require('express-validator');
const Asset = require('../../models/asset');
const handle400 = require('../../middlewares/errorHandlers/handle400');

module.exports = (router) => {
  /**
  * Get assets
  */
  router.get('/', [
    query('parent').if(query('parent').exists()).isMongoId(),
  ], handle400, async (req, res) => {
    const { parent } = req.query;
    const query = parent
      ? { parent }
      : { parent: { $exists: false } };

    // Get asset from database
    try {
      const asset = await Asset.find(query);

      res.status(200).send(asset);
    } catch (error) {
      req.handle500(error);
    }
  });
};
