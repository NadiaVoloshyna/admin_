const { body } = require('express-validator');
const User = require('../../models/user');
const handle400 = require('../../middlewares/errorHandlers/handle400');

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
    const isAdmin = req.user.role === 'admin';
    const isAuthor = req.user.role === 'author';
    const isReviewer = req.user.role === 'reviewer';
    const { users } = res.locals;
    const { user } = req;

    const permission = user.deactivate('users');
    if (permission === false || isAuthor || isReviewer) {
      return res.status(403).end();
    }

    const admins = users.some(user => user.role.includes('admin' || 'super'));
    if (admins && isAdmin) {
      return res.status(403).end();
    }
  } catch (error) {
    return req.handle500(error);
  }
  next();
};

// Deactivate one or multiple users
const deactivateUsers = async (req, res) => {
  try {
    const { users } = res.locals;
    await User.updateMany(
      { _id: { $in: users.map(item => item._id) } },
      { active: false },
    );

    return res.status(200).end();
  } catch (error) {
    return req.handle500(error);
  }
};

module.exports = (router) => {
  router.put('/', [
    body('ids').exists().isArray({ min: 1 }).withMessage('At least one id is required'),
  ],
  handle400,
  getResources,
  checkPermissions,
  deactivateUsers);
};
