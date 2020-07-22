import { string, oneOf, number, shape, arrayOf, bool } from 'prop-types';
import { PERSON_POST_STATUSES } from 'shared/constants/index';
import { USER_ROLES } from 'common/constants/index';
import { ProfessionType } from './profession';
import { Biography } from './biography';

export const Person = {
  name: string.isRequired,
  status: oneOf(PERSON_POST_STATUSES).isRequired,
  created: number.isRequired,
  createdBy: string.isRequired,
  biography: shape(Biography),
  born: number,
  died: number,
  title: string,
  portrait: string,
  rootAssetId: string.isRequired,
  professions: arrayOf(ProfessionType),
  permissions: arrayOf({
    role: oneOf(USER_ROLES).isRequired,
    permissionId: string.isRequired,
    user: string.isRequired,
    active: bool.isRequired
  })
};
