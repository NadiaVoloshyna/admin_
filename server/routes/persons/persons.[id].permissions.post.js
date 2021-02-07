const { body, check } = require('express-validator');
const Person = require('../../models/person');
const User = require('../../models/user');
const DrivePermission = require('../../models/drivePermission');
const Activity = require('../../models/activity');
const GoogleApi = require('../../services/google');
const helpers = require('../../helpers/permissions');
const { getHooksContext } = require('../../helpers');
const handle400 = require('../../middlewares/errorHandlers/handle400');

// TODO: split into middlewares and add permissions check
module.exports = (router) => {
  router.post('/:id/permissions', [
    check('id').isMongoId(),
    body('userId').isMongoId(),
  ], handle400, async (req, res) => {
    const { id: _id } = req.params;
    const { userId } = req.body;

    try {
      const user = await User.findById({ _id: userId });

      const person = await Person.findOneAndUpdate(
        { _id },
        { $push: { [`${user.role}s`]: userId } },
        {
          new: true,
          hookMeta: getHooksContext(req),
        },
      );

      const { biography: { documentId }, status } = person;

      const { data: { id } } = await GoogleApi.createPermission(
        documentId,
        helpers.getRoleToUpdate(status, user.role),
        user.email,
      );

      const permission = {
        permissionId: id,
        user: userId,
        fileId: documentId,
      };

      // Create permission
      const newPermission = await new DrivePermission(permission).save();
      newPermission.user = user;

      // Create activity
      const activity = {
        personId: _id,
        message: `${req.user.fullName} <b>assugned</b> ${user.fullName} to be person's ${user.role}`,
      };

      await new Activity(activity).save();

      res.status(201).send(newPermission);
    } catch (error) {
      return req.handle500(error);
    }
  });
};
