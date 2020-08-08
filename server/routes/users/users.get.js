const { query } = require('express-validator');
const User = require('../../models/user');
const { createQueryForPagination } = require('../../helpers/resolvers');
const handle400 = require('../../middlewares/errorHandlers/handle400');

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
  ], handle400, async (req, res) => {
    try {
      const { query, options } = createQueryForPagination({
        ...req.query,
        fields: ['firstName', 'lastName'],
        sortBy: 'lastName'
      });
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
      req.handle500(error);
    }
  });
};
