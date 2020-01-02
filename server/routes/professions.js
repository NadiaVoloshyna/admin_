const router = require('express').Router();
const Profession = require('../models/profession');
const { query, body } = require('express-validator');
const { createQueryForPagination } = require('../helpers/resolvers');
const handleError = require('../helpers/handleError');
const errorHandler = require('../middlewares/errorHandler');

/**
 * Get subset of professions based of query parameters
 */
router.get('/', [
  query('offset').if(body('offset').exists()).escape().isNumeric(),
  query('searchTerm').if(body('searchTerm').exists()).escape(),
  query('limit').if(body('limit').exists()).escape().isNumeric(),
  query('sort').if(body('sort').exists()).escape().isIn([
    'ascending',
    'descending',
    'newest',
    'older'
  ]),
], errorHandler, async (req, res) => {
  try {
    const { query, options } = createQueryForPagination({ ...req.query});
    const professions = await Profession.paginate(query, options);

    const response = {
      professions: professions.docs,
      pagination: {
        total: professions.total,
        limit: professions.limit,
        offset: professions.offset
      }
    }

    res.send(response);
  } catch (error) {
    handleError.custom(res, 500, error);
  }
});

/**
 * Create profession
 * 1. Find profession in DB
 * 2. If profession exists, exit
 * 3. If profession not exists create google document for the person
 * 4. Create person
 * 5. If document creation failed continue creating person
 * 6. If document was created add document id to persons data
 */
router.post('/', [
  body('name').isString().escape()
], errorHandler, async (req, res) => {
  const { name } = req.body;

  // Check if profession exists
  try {
    const profession = await Profession.findOne({name});

    if (profession) {
      // profession with this name is already exist
      res.status(409).send({
        id: profession._id,
        name: profession.name
      });
      return;
    }
  } catch (error) {
    return handleError.custom(res, 500, error);
  }

  // Create profession
  try {
    newProfession = await new Profession({
      name
    }).save();
  } catch (error) {
    return handleError.custom(res, 500, error);
  }

  res.status(201).send({
    id: newProfession._id,
    name: newProfession.name
  });
});

/**
 * Delete one or multiple professions
 */
router.delete('/', [
  body('ids').exists().isArray({min: 1}).withMessage('At least one id is required'),
], errorHandler, async (req, res) => {
  const { ids } = req.body;

  try {
    await Profession.deleteMany({ 
      _id: ids
    });

    res.status(200).end();
    return;
  } catch (error) {
    return handleError.custom(res, 500, error);
  }
});

module.exports = router;