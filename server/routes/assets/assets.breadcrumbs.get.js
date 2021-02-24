const { query } = require('express-validator');
const mongoose = require('mongoose');
const Asset = require('../../models/asset');
const handle400 = require('../../middlewares/errorHandlers/handle400');

module.exports = (router) => {
  /**
  * Get assets
  */
  router.get('/breadcrumbs', [
    query('id').exists().isMongoId(),
  ], handle400, async (req, res) => {
    const { id } = req.query;

    try {
      const asset = await Asset.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(id) } },
        {
          $graphLookup: {
            from: 'asset',
            startWith: '$parent',
            connectFromField: 'parent',
            connectToField: '_id',
            as: 'crumbs',
          },
        },
        {
          $project: {
            'crumbs._id': 1,
            'crumbs.name': 1,
            name: 1,
          },
        },
      ]);

      const crumbs = [asset[0], ...asset[0].crumbs].reverse();

      res.status(200).send(crumbs);
    } catch (error) {
      req.handle500(error);
    }
  });
};
