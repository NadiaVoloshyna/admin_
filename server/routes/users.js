const router = require('express').Router();
const User = require('../models/user');
const Invite = require('../models/invite');
const { query, body, param } = require('express-validator');
const errorHandler = require('../middlewares/errorHandler');
const mailer = require('../services/mailer');
const cryptoRandomString = require('crypto-random-string');
const { createQueryForPagination } = require('../helpers/resolvers');
const handleError = require('../helpers/handleError');
const { template, subject } = require('../services/mailer/templates/inviteUser');

/**
 * Invite user
 * 1. Check if this email already exist
 * 2. Generate token
 * 3. Save the invite
 * 4. Send invite email
 */
router.post('/invite', [
  body('email').escape().isEmail(),
  // TODO: uncomment in prod
  //body('email').escape().isEmail().normalizeEmail(),
  body('role').escape().isIn([
    'admin',
    'author',
    'reviewer'
  ])
], errorHandler, async (req, res) => {
  const { email, role } = req.body;
  const token = cryptoRandomString({length: 32, type: 'url-safe'});
  let user;
  
  try {
    // Check if email exists
    user = await User.findOne({ email });

    if (user) {
      return handleError.custom(res, 409, 'User with this email is already exist');
    }

    // Save the invite
    user = await Invite({
      email,
      role,
      token,
    }).save();
  } catch (error) {
    return handleError(res, 500, error);
  }

  // send invite email
  // TODO: handle error
  mailer({
    template: template(token, role),
    to: email,
    subject: subject()
  }).catch(handleError);

  res.status(200).end();
});

router.get('/', [
  query('offset').exists().escape().isNumeric(),
  query('searchTerm').exists().escape(),
  query('sort').exists().escape().isIn([
    'ascending',
    'descending',
    'newest',
    'older'
  ])
], errorHandler, async (req, res) => {
  try {
    const { query, options } = createQueryForPagination({ ...req.query, limit: 10});
    const users = await User.paginate(query, options);
    const documents = users.docs.filter(item => item.role !== 'super');

    const response = {
      users: documents.map(item => item.toJson()),
      pagination: {
        total: users.total,
        limit: users.limit,
        offset: users.offset
      }
    }

    res.status(200).send(response);
  } catch (error) {
    handleError.custom(res, 500, error);
  }
});

router.put('/:id', [
  param('id').isMongoId(),
  body('active').if(body('active').exists()).isBoolean()
], errorHandler, async (req, res) => {
  const query = { 
    _id: req.params.id
  };

  const constructBody = (body, fields) => {
    return fields.reduce((acc, key) => {
      if (body.hasOwnProperty(key)) {
        acc[key] = body[key];
      }

      return acc;
    }, {});
  }

  const updateBody = constructBody(req.body, [
    'active'
  ])

  try {
    const user = await User.findByIdAndUpdate(query, updateBody);
    res.status(200).send(user);
  } catch (error) {
    handleError.custom(res, 500, error);
  }
});

module.exports = router;