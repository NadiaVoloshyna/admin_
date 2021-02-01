const { query } = require('express-validator');
const User = require('../../models/user');
const { createQueryForPagination, createSortVarints } = require('../../helpers/resolvers');
const handle400 = require('../../middlewares/errorHandlers/handle400');

const validators = [
  query('q').if(query('q').exists()).escape().isString(),
  query('offset').if(query('offset').exists()).escape().isNumeric(),
  query('limit').if(query('limit').exists()).escape().isNumeric(),
  query('role').if(query('role').exists()).escape().isString(),
  query('status').if(query('status').exists()).escape().isString(),
  query('sort').if(query('sort').exists()).escape().isIn(
    createSortVarints('fullName', 'created', 'role', 'email'),
  ),
];

module.exports = (router) => {
  router.get('/', validators, handle400, async (req, res) => {
    try {
      req.query = {
        ...req.query,
        // transforma status from `active` to true and from `blocked` to false
        ...(req.query.status && { active: req.query.status === 'active' }),
      };

      const { query, options } = createQueryForPagination({
        query: req.query,
        searchBy: ['firstName', 'lastName'],
      });

      const response = await User.paginate(query, options);

      // Rename docs to users and remove unnesessary data from user
      response.users = response.docs.map(item => item.toJson());
      delete response.docs;

      res.status(200).send(response);
    } catch (error) {
      req.handle500(error);
    }
  });
};
