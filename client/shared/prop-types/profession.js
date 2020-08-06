import { string, bool } from 'prop-types';

export const ProfessionType = {
  name: string.isRequired,
  active: bool,
  _id: string.isRequired
};
