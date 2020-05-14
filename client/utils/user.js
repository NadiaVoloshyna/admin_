import permissions from '../permissions';

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
}

export const destructureUser = (user) => {
  if (!user) return null;

  const roles = getRoles(user.role);
  const { isSuper, isAdmin, isAuthor, isReviewer } = roles;

  return {
    ...user,
    isSuper,
    isAdmin,
    isAuthor,
    isReviewer,
    userRoleUp,
    permissions: permissions.can(user.role)
  }
}