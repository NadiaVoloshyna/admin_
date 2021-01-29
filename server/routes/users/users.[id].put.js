const { body, param } = require('express-validator');
const { each } = require('async');
const User = require('../../models/user');
const DrivePermission = require('../../models/drivePermission');
const GoogleApi = require('../../services/google');
const handle400 = require('../../middlewares/errorHandlers/handle400');

// TODO: add permissions check. This one should be simple.
// Check if active and if logged in user is the user we are trying to update
module.exports = (router) => {
  router.put('/:id', [
    param('id').isMongoId(),
    body('active').if(body('active').exists()).isBoolean(),
    body('image').if(body('image').exists()).isString().escape(),
  ], handle400, async (req, res) => {
    const query = {
      _id: req.params.id,
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
      'active',
      'image',
    ]);

    // If not active remove all drive permissions
    // TODO: think about moving this logic into seperate API
    if (req.body.active === 'false') {
      const permissions = await DrivePermission.find({ user: user._id });

      await each(permissions, async ({ permissionId, fileId }) => {
        await GoogleApi.deletePermission(fileId, permissionId);
      });

      await DrivePermission.updateMany(
        { _id: { $in: permissions.map(item => item._id) } },
        { active: false },
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
