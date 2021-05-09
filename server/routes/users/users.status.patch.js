const { body } = require('express-validator');
const User = require('../../models/user');
const handle400 = require('../../middlewares/errorHandlers/handle400');
const removeDrivePermissions = require('./controllers/removeDrivePermissions');

// Get resources from database
const getResources = async (req, res, next) => {
  const { ids } = req.body;

  try {
    const users = await User.find({ _id: { $in: ids } });
    if (!users || !users.length) {
      return res.status(404).end();
    }

    res.locals.users = users;
    next();
  } catch (error) {
    return req.handle500(error);
  }
};

// Check if user has permissions to deactivate users
const checkPermissions = (req, res, next) => {
  try {
    const { user } = req;
    const isAdmin = user.role === 'admin';
    const { users } = res.locals;

    const { active } = req.body;
    const hasPemission = active === true
      ? user.activate : user.deactivate;

    // Author and reviewer can't change status
    if (hasPemission('users') === false) {
      return res.status(403).end();
    }

    // If you are admin you can't change status of admin or super
    const admins = users.some(user => user.role.includes('admin' || 'super'));
    if (admins && isAdmin) {
      return res.status(403).end();
    }
  } catch (error) {
    return req.handle500(error);
  }
  next();
};

// Change status one or multiple users
const changeStatus = async (req, res) => {
  try {
    const { ids, active } = req.body;

    await User.updateMany(
      { _id: { $in: ids } },
      { active },
    );

    // Remove all drive permissions for deactivated user
    if (active === false) {
      await removeDrivePermissions(ids);
    }

    return res.status(200).end();
  } catch (error) {
    return req.handle500(error);
  }
};

module.exports = (router) => {
  router.patch('/', [
    body('ids').exists().isArray({ min: 1 }).withMessage('At least one id is required'),
    body('active').exists().isBoolean(),
  ],
  handle400,
  getResources,
  checkPermissions,
  changeStatus);
};
