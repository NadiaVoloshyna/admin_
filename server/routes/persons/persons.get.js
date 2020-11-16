const { query } = require('express-validator');
const Person = require('../../models/person');
const { createQueryForPagination, createSortVarints } = require('../../helpers/resolvers');
const handle400 = require('../../middlewares/errorHandlers/handle400');

const validators = [
  query('q').if(query('q').exists()).escape().isString(),
  query('offset').if(query('offset').exists()).escape().isNumeric(),
  query('limit').if(query('limit').exists()).escape().isNumeric(),
  query('sort').if(query('sort').exists()).escape().isIn(
    createSortVarints('name', 'created')
  )
];

module.exports = (router) => {
  /**
   * Get subset of persons based of query parameters
   */
  router.get('/', validators, handle400, async (req, res) => {
    try {
      const { query, options } = createQueryForPagination({
        query: req.query
      });

      options.populate = ['professions.profession', {
        path: 'drivePermissions',
        model: 'DrivePermission',
        populate: [{
          path: 'user',
          model: 'User',
        }]
      }];

      const response = await Person.paginate(query, options);

      response.docs = response.docs.map(item => {
        const person = item.toObject();

        const getUsersByRole = (role) => {
          return person.drivePermissions
            .filter(item => item.user.role === role)
            .map(item => ({
              name: item.user.fullName // change this to a function which excepts fields to return
            })); // remove unnecessary data
        };

        const newPerson = {
          ...person,
          authors: getUsersByRole('author'),
          reviewers: getUsersByRole('reviewer'),
        };

        delete newPerson.drivePermissions;

        return newPerson;
      });

      res.send(response);
    } catch (error) {
      req.handle500(error);
    }
  });
};
