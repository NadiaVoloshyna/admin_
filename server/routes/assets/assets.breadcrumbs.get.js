const { query } = require('express-validator');
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
    const crumbs = [];

    // TODO: temp solution while I try to figure out whi graphLookup isn't working
    const recursion = async (id) => {
      const asset = await Asset.findOne({ _id: id });
      if (asset) {
        crumbs.push(asset);
        await recursion(asset.parent);
      }
    };

    await recursion(id);

    try {
      // const result = await Asset.aggregate([
      //   { $match: { _id: id } },
      //   {
      //     $graphLookup: {
      //       from: 'asset',
      //       startWith: '$parent',
      //       connectFromField: 'parent',
      //       connectToField: '_id',
      //       as: 'crumbs',
      //     }
      //   }
      // ]);

      const test = crumbs.map(item => ({
        _id: item._id,
        name: item.name,
      })).reverse();

      res.status(200).send(test);
    } catch (error) {
      req.handle500(error);
    }
  });
};
