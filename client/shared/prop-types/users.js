import { string, bool } from 'prop-types';

export const UsersType = {
  firstName: string,
  lastName: string,
  fullName: string,
  displayName: string,
  email: string.isRequired,
  created: string.isRequired,
  role: string.isRequired,
  active: bool.isRequired,
  _id: string.isRequired
};
