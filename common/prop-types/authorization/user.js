import { string, number, oneOf, bool, object, func } from 'prop-types';
import { USER_ROLES } from '../../constants/index';

export const UserType = {
  firstName: string,
  lastName: string,
  fullName: string,
  displayName: string,
  email: string,
  created: number,
  role: oneOf(Object.values(USER_ROLES)),
  active: bool,
  _id: string,
  isSuper: bool,
  isAdmin: bool,
  isAuthor: bool,
  isReviewer: bool,
  userRoleUp: func,
  permissions: object
};
