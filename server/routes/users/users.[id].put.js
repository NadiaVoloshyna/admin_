const { body, param } = require('express-validator');
const { each } = require('async');
const User = require('../../models/user');
const DrivePermission = require('../../models/drivePermission');
const GoogleApi = require('../../services/google');
const handle400 = require('../../middlewares/errorHandlers/handle400');

module.exports = (router) => {
  router.put('/:id', [
    param('id').isMongoId(),
    body('active').if(body('active').exists()).isBoolean()
  ], handle400, async (req, res) => {
    const query = {
      _id: req.params.id
    };

    const user = await User.findById({ _id: req.params.id });

    const constructBody = (body, fields) => {
      return fields.reduce((acc, key) => {
        // eslint-disable-next-line no-prototype-builtins
        if (body.hasOwnProperty(key)) {
          acc[key] = body[key];
        }

        return acc;
      }, {});
    };

    const updateBody = constructBody(req.body, [
      'active'
    ]);

    // If not active remove all drive permissions
    if (req.body.active === 'false') {
      const permissions = await DrivePermission.find({ user: user._id });

      await each(permissions, async ({ permissionId, fileId }) => {
        await GoogleApi.deletePermission(fileId, permissionId);
      });

      await DrivePermission.updateMany(
        { _id: { $in: permissions.map(item => item._id) } },
        { active: false }
      );
    }

    try {
      const user = await User.updateOne(query, updateBody);
      res.status(200).send(user);
    } catch (error) {
      req.handle500(error);
    }
  });
};
