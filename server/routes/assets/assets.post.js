const { body } = require('express-validator');
const Asset = require('../../models/asset');
const handle400 = require('../../middlewares/errorHandlers/handle400');

module.exports = (router) => {
  /**
 * Create asset
 * 1. Get current user
 * 2. Save asset to DB
 */
  router.post('/', [
    body('name').isString().escape(),
    body('type').isIn(['FOLDER', 'IMAGE', 'VIDEO', 'ALBUM']),
    body('parent').if(body('parent').exists()).isMongoId(),
    body('url').if(body('url').exists()).isString(),
    body('author').if(body('author').exists()).isString(),
    body('year').if(body('year').exists()).isNumeric(),
    body('description').if(body('description').exists()).isString(),
  ], handle400, async (req, res) => {
    const {
      name,
      type,
      parent,
      url,
      author,
      year,
      description,
    } = req.body;

    // 1. Get current user
    const userId = req.user._id;

    // 2. Create new asset
    try {
      const asset = await new Asset({
        name,
        type,
        parent,
        url,
        author,
        year,
        description,
        createdBy: userId,
      }).save();

      res.status(302).send(asset);
    } catch (error) {
      req.handle500(error);
    }
  });
};
