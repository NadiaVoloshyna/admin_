const { body } = require('express-validator');
const { USER_ROLES } = require('../../../common/constants');
const Permissions = require('../../models/permissions');
const handle400 = require('../../middlewares/errorHandlers/handle400');

// 1. Create permissions
const createPermission = async (req, res) => {
  const { resource, action, attributes } = req.body;
  let newPermissions;

  try {
    const permissions = Object.values(USER_ROLES).map(role => ({
      resource,
      action,
      role,
      attributes,
      permitted: role === USER_ROLES.SUPER // defaults to true for super admin
    }));

    const tasks = permissions.map((permission) => new Permissions(permission).save());
    newPermissions = await Promise.all(tasks);
  } catch (error) {
    return req.handle500(error);
  }

  res.status(201).send(newPermissions);
};

module.exports = (router) => {
  router.post('/',
    [
      body('resource').isString().escape(),
      body('action').isString().escape(),
      body('attributes').if(body('attributes').exists()).isArray()
    ],
    handle400,
    createPermission);
};
