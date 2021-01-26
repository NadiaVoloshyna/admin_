const { query } = require('express-validator');
const Profession = require('../../models/profession');
const { createQueryForPagination, createSortVarints } = require('../../helpers/resolvers');
const handle400 = require('../../middlewares/errorHandlers/handle400');

const validators = [
  query('q').if(query('q').exists()).escape().isString(),
  query('offset').if(query('offset').exists()).escape().isNumeric(),
  query('limit').if(query('limit').exists()).escape().isNumeric(),
  query('sort').if(query('sort').exists()).escape().isIn(
    createSortVarints('name', 'description', 'createdBy', 'created'),
  ),
  query('createdBy').if(query('createdBy').exists()).escape().isIn(['me']),
];

module.exports = (router) => {
  /**
   * Get subset of professions based of query parameters
   */
  router.get('/', validators, handle400, async (req, res) => {
    try {
      const { query, options } = createQueryForPagination({
        user: req.user,
        query: req.query,
      });
      const response = await Profession.paginate(query, options);

      res.send(response);
    } catch (error) {
      req.handle500(error);
    }
  });
};
