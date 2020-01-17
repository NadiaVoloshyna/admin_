const router = require('express').Router();
const Person = require('../models/person');
const Asset = require('../models/asset');
const Cloudinary = require('../services/cloudinary');
const { query, body, check } = require('express-validator');
const handleError = require('../helpers/handleError');
const errorHandler = require('../middlewares/errorHandler');

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
], errorHandler, async (req, res) => {
  const { 
    name, 
    type, 
    parent, 
    url,
    author,
    year,
    description
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
      createdBy: userId
    }).save();

    res.status(302).send(asset);
  } catch (error) {
    return handleError.custom(res, 500, error);
  }
});

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
    const asset = await Asset.findOne({ _id: id });
    await asset.remove();

    // 2. Delete cloudinary asset
    // TODO
    return res.status(200).end();
  } catch (error) {
    return handleError.custom(res, 500, error);
  }
});

module.exports = router;