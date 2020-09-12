const { createPermissions } = require('../../../common/utils');

const deserializeUser = (user) => {
  user = user.toObject();
  user = {
    ...createPermissions(user.permissions),
    ...user,
  };

  delete user.password;

  return user;
};

module.exports = {
  deserializeUser
};
