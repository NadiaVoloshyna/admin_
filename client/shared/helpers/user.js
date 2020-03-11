const USER_ROLES = {
  SUPER: 'super',
  ADMIN: 'admin',
  AUTHOR: 'author',
  REVIEWER: 'reviewer'
}

// Role an up
export const isRole = (user, role) => {
  if (role === USER_ROLES.SUPER) return user.isSuper;
  if (role === USER_ROLES.ADMIN) return user.isSuper || user.isAdmin;
  if (role === USER_ROLES.AUTHOR) return user.isSuper || user.isAdmin || user.isAuthor;
  if (role === USER_ROLES.REVIEWER) return true;
}

export const isRoleOnly = (user, role) => {
  if (role === USER_ROLES.SUPER) return user.isSuper;
  if (role === USER_ROLES.ADMIN) return user.isAdmin;
  if (role === USER_ROLES.AUTHOR) return user.isAuthor;
  if (role === USER_ROLES.REVIEWER) return user.isReviewer;
}