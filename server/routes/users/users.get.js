const { query } = require('express-validator');
const User = require('../../models/user');
const errorHandler = require('../../middlewares/errorHandler');
const { createQueryForPagination } = require('../../helpers/resolvers');
const handleError = require('../../helpers/handleError');

module.exports = (router) => {
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
      const { query, options } = createQueryForPagination({ ...req.query, limit: 10 });
      const users = await User.paginate(query, options);
      const documents = users.docs.filter(item => item.role !== 'super');

      const response = {
        users: documents.map(item => item.toJson()),
        pagination: {
          total: users.total,
          limit: users.limit,
          offset: users.offset
        }
      };

      res.status(200).send(response);
    } catch (error) {
      handleError.custom(res, 500, error);
    }
  });
};
