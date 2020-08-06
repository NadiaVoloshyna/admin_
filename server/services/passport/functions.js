const { getPermissions } = require('../../../permissions');

const deserializeUser = (user) => {
  const permissions = getPermissions(user.role);
  user = user.toObject();
  user = {
    ...permissions,
    ...user,
  };

  delete user.password;

  return user;
};

module.exports = {
  deserializeUser
};
