const Person = require('../../models/person');
const { query } = require('express-validator');
const { createQueryForPagination } = require('../../helpers/resolvers');
const handleError = require('../../helpers/handleError');
const errorHandler = require('../../middlewares/errorHandler');


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
  ], errorHandler, async (req, res) => {
    try {
      let { query, options } = createQueryForPagination({ ...req.query});

      const persons = await Person.paginate(query, options);

      const response = {
        persons: persons.docs,
        pagination: {
          total: persons.total,
          limit: persons.limit,
          offset: persons.offset
        }
      }

      res.send(response);
    } catch (error) {
      handleError.custom(res, 500, error);
    }
  });
}