import { string, oneOf, shape, arrayOf, bool } from 'prop-types';
import { PERSON_POST_STATUSES } from 'shared/constants/index';
import { USER_ROLES } from 'common/constants/index';
import { Biography } from './biography';

export const Person = {
  name: string.isRequired,
  status: oneOf(Object.values(PERSON_POST_STATUSES)).isRequired,
  created: string.isRequired,
  createdBy: string.isRequired,
  biography: shape(Biography),
  born: string,
  died: string,
  title: string,
  portrait: string,
  rootAssetId: string.isRequired,
  professions: arrayOf(shape({
    profession: string,
    active: bool.isRequired,
    media: arrayOf(string),
  })),
  permissions: arrayOf(shape({
    role: oneOf([ ...Object.values(USER_ROLES), 'reader']).isRequired,
    permissionId: string.isRequired,
    user: string.isRequired,
    active: bool.isRequired
  }))
};
