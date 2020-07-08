const { query } = require('express-validator');
const Person = require('../../models/person');
const { createQueryForPagination } = require('../../helpers/resolvers');
const handle400 = require('../../middlewares/errorHandlers/handle400');

module.exports = (router) => {
  /**
   * Get subset of persons based of query parameters
   */
  router.get('/', [
    query('offset').exists().escape().isNumeric(),
    query('searchTerm').exists().escape(),
    query('sort').exists().escape().isIn([
      'ascending',
      'descending',
      'newest',
      'older'
    ]),
  ], handle400, async (req, res) => {
    try {
      const { query, options } = createQueryForPagination({ ...req.query });

      const persons = await Person.paginate(query, options);

      const response = {
        persons: persons.docs,
        pagination: {
          total: persons.total,
          limit: persons.limit,
          offset: persons.offset
        }
      };

      res.send(response);
    } catch (error) {
      req.handle500(error);
    }
  });
};
