const { query } = require('express-validator');
const Asset = require('../../models/asset');
const handle400 = require('../../middlewares/errorHandlers/handle400');
const { createQueryForPagination } = require('../../helpers/resolvers');

module.exports = (router) => {
  /**
  * Get assets
  */
  router.get('/', [
    query('path').if(query('path').exists()).isMongoId(),
  ], handle400, async (req, res) => {
    const { query } = createQueryForPagination({
      query: req.query,
      user: req.user,
    });

    // Get asset from database
    try {
      const asset = await Asset.find({
        ...query,
        parent: query.parent || { $exists: false },
      });

      res.status(200).send(asset);
    } catch (error) {
      req.handle500(error);
    }
  });
};
