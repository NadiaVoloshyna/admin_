import { string, oneOf, bool, array } from 'prop-types';
import { USER_ROLES } from '../../constants/index';

export const UserType = {
  firstName: string,
  lastName: string,
  fullName: string,
  displayName: string,
  email: string,
  created: string,
  role: oneOf(Object.values(USER_ROLES)),
  active: bool,
  _id: string,
  permissions: array,
};
