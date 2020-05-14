const Person = require('../../models/person');
const GoogleApi = require('../../services/google');
const { body, check } = require('express-validator');
const handleError = require('../../helpers/handleError');
const helpers = require('../../helpers/permissions');
const errorHandler = require('../../middlewares/errorHandler');
const { FROM_GOOGLE_ROLES } = require('../../constants');

module.exports = (router) => {
  router.post('/:id/permissions', [
    check('id').isMongoId(),
    body('users').isArray({
      min: 1,
      max: 3
    })
  ], errorHandler, async (req, res) => {
    const { id: _id } = req.params;
    const { users } = req.body;

    try {
      const person = await Person.findById(_id);
      const { biography: { documentId }, status } = person;

      const requests = users.map(user => GoogleApi.createPermissions(
        documentId,
        helpers.getRoleToUpdate(status, user.role),
        user.email
      ));
      const responses = await Promise.all(requests);

      const permissions = responses.map(({ data }) => ({
        role: FROM_GOOGLE_ROLES[data.role.toUpperCase()],
        permissionId: data.id,
        user: users.find(item => item.email === data.emailAddress),
      }));

      await Person.update(
        { _id },
        { 
          '$push': { 
            'permissions': { 
              '$each': permissions.map(item => ({
                ...item,
                user: item.user._id
              }))
            } 
          } 
        },
      );

      res.status(201).send(permissions);
    } catch (error) {
      return handleError.custom(res, 500, error);
    }
  });
}