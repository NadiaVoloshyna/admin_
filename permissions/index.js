const AccessControl = require('accesscontrol');
const reviewer = require('./reviewer');
const author = require('./author');
const admin = require('./admin');
const superAdmin = require('./super');

const permissions = {
  reviewer,
  author,
  admin,
  super: superAdmin
};

const listOfActions = [
  'createOwn',
  'createAny',
  'create',
  'readOwn',
  'readAny',
  'read',
  'updateOwn',
  'updateAny',
  'update',
  'deleteOwn',
  'deleteAny',
  'delete',
];

module.exports = {
  getPermissions: (role) => {
    const ac = new AccessControl(permissions[role]);
    ac.lock();
    const actions = ac.can(role);

    return listOfActions.reduce((acc, next) => {
      acc[next] = (resource) => actions[next](resource);
      return acc;
    }, { grants: ac._grants });
  }
};
