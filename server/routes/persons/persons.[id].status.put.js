const { body, check } = require('express-validator');
const { each } = require('async');
const Person = require('../../models/person');
const GoogleApi = require('../../services/google');
const helpers = require('../../helpers/permissions');
const { PERSON_POST_STATUSES } = require('../../constants');
const handle400 = require('../../middlewares/errorHandlers/handle400');

/**
 * Sets document status
 * 2. Updates the status of the Person
 */
module.exports = (router) => {
  router.put('/:id/status', [
    check('id').isMongoId(),
    body('status').isIn([
      PERSON_POST_STATUSES.IN_PROGRESS,
      PERSON_POST_STATUSES.AWAITS_REVIEW,
      PERSON_POST_STATUSES.IN_REVIEW,
      PERSON_POST_STATUSES.READY_TO_PUBLISH,
      PERSON_POST_STATUSES.PUBLISHED
    ]),
  ], handle400, async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;

    try {
      const person = await Person.findById(id);
      const { biography: { documentId } } = person;

      await each(person.permissions, async ({ role, permissionId }) => {
        await GoogleApi.updatePermissions(
          documentId,
          permissionId,
          helpers.getRoleToUpdate(status, role)
        );
      });

      await Person.updateOne(
        { _id: id },
        { status }
      );
    } catch (error) {
      return req.handle500(error);
    }

    res.status(200).end();
  });
};
