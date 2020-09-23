const { body, check } = require('express-validator');
const { each } = require('async');
const { PERSON_POST_STATUSES } = require('../../../common/constants');
const Person = require('../../models/person');
const GoogleApi = require('../../services/google');
const helpers = require('../../helpers/permissions');
const handle400 = require('../../middlewares/errorHandlers/handle400');

// 1. Get resources from database
const getResource = async (req, res, next) => {
  const { id } = req.params;

  try {
    const person = await Person.findById(id)
      .populate([{
        path: 'drivePermissions',
        model: 'DrivePermission',
        populate: [{
          path: 'user',
          model: 'User',
        }]
      }])
      .exec();

    if (!person) {
      return res.status(404).end();
    }

    res.locals.person = person;
    next();
  } catch (error) {
    return req.handle500(error);
  }
};

// 2. Check if user has permissions to delete a person
const checkPermissions = (req, res, next) => {
  try {
    const { user } = req;
    const { person } = res.locals;

    const canChangeStatus = user.changeStatus('persons', person.status);

    if (!canChangeStatus) {
      return res.status(403).end();
    }
  } catch (error) {
    return req.handle500(error);
  }

  next();
};

// 3. Update status and permissions
const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const { person } = res.locals;

  try {
    const { drivePermissions } = person;
    const permissions = drivePermissions.filter(item => item.active);

    await each(permissions, async ({ permissionId, fileId, user }) => {
      await GoogleApi.updatePermission(
        fileId,
        permissionId,
        helpers.getRoleToUpdate(status, user.role)
      );
    });

    await Person.updateOne(
      { _id: id },
      { status }
    );

    res.status(200).end();
  } catch (error) {
    req.handle500(error);
  }
};

// Sets document status
module.exports = (router) => {
  router.put('/:id/status', [
    check('id').isMongoId(),
    body('status').isIn([
      PERSON_POST_STATUSES.NEW,
      PERSON_POST_STATUSES.IN_PROGRESS,
      PERSON_POST_STATUSES.IN_REVIEW,
      PERSON_POST_STATUSES.READY,
      PERSON_POST_STATUSES.PUBLISHED
    ]),
  ],
  handle400,
  getResource,
  checkPermissions,
  updateStatus);
};
