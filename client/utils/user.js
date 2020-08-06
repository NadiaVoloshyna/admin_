import AccessControl from 'accesscontrol';

const getRoles = (role) => ({
  isSuper: role === 'super',
  isAdmin: role === 'admin',
  isAuthor: role === 'author',
  isReviewer: role === 'reviewer'
});

const userRoleUp = (role) => {
  const { isSuper, isAdmin, isAuthor } = getRoles(role);

  if (role === 'super') return isSuper;
  if (role === 'admin') return isSuper || isAdmin;
  if (role === 'author') return isSuper || isAdmin || isAuthor;
  if (role === 'reviewer') return true;
};

const getPermissions = (user) => {
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
    'delete'
  ];

  const ac = new AccessControl(user.grants);
  ac.lock();
  const actions = ac.can(user.role);

  return listOfActions.reduce((acc, next) => {
    acc[next] = (resource) => actions[next](resource);
    return acc;
  }, {});
};

export const destructureUser = (user) => {
  if (!user) return null;

  const roles = getRoles(user.role);
  const { isSuper, isAdmin, isAuthor, isReviewer } = roles;

  return {
    ...user,
    ...getPermissions(user),
    isSuper,
    isAdmin,
    isAuthor,
    isReviewer,
    userRoleUp,
  };
};
