const { query, body } = require('express-validator');
const Profession = require('../../models/profession');
const { createQueryForPagination } = require('../../helpers/resolvers');
const handle400 = require('../../middlewares/errorHandlers/handle400');

module.exports = (router) => {
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
  ], handle400, async (req, res) => {
    try {
      const { query, options } = createQueryForPagination({ ...req.query });
      const professions = await Profession.paginate(query, options);

      const response = {
        professions: professions.docs,
        pagination: {
          total: professions.total,
          limit: professions.limit,
          offset: professions.offset
        }
      };

      res.send(response);
    } catch (error) {
      req.handle500(error);
    }
  });
};
