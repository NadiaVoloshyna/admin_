const { each } = require('async');
const DrivePermission = require('../../../models/drivePermission');
const GoogleApi = require('../../../services/google');

const removeDrivePermissions = async (ids) => {
  const permissions = await DrivePermission.find({ user: { $in: ids } });

  await DrivePermission.updateMany(
    { _id: { $in: permissions.map(item => item._id) } },
    { active: false },
  );

  await each(permissions, async ({ permissionId, fileId }) => {
    await GoogleApi.deletePermission(fileId, permissionId);
  });
};

module.exports = removeDrivePermissions;
