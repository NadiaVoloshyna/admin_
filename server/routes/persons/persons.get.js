const { query } = require('express-validator');
const Person = require('../../models/person');
const { createQueryForPagination, createSortVarints } = require('../../helpers/resolvers');
const { everyMongoId, everyStatus } = require('../../helpers/validators');
const handle400 = require('../../middlewares/errorHandlers/handle400');

const validators = [
  query('q').if(query('q').exists()).escape().isString(),
  query('offset').if(query('offset').exists()).escape().isNumeric(),
  query('limit').if(query('limit').exists()).escape().isNumeric(),
  query('sort').if(query('sort').exists()).escape().isIn(
    createSortVarints('name', 'created', 'status'),
  ),
  query('authors').if(query('authors').exists()).custom(everyMongoId),
  query('reviewers').if(query('reviewers').exists()).custom(everyMongoId),
  query('status').if(query('status').exists()).custom(everyStatus),
];

module.exports = (router) => {
  /**
   * Get subset of persons based of query parameters
   */
  router.get('/', validators, handle400, async (req, res) => {
    try {
      const { query, options } = createQueryForPagination({
        query: req.query,
        user: req.user,
      });

      options.populate = [
        'professions.profession',
        { path: 'authors', select: 'firstName lastName image' },
        { path: 'reviewers', select: 'firstName lastName image' },
      ];

      const response = await Person.paginate(query, options);
      response.docs = response.docs.map(item => item.toObject());

      res.send(response);
    } catch (error) {
      req.handle500(error);
    }
  });
};
