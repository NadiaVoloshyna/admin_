import { PERSON_POST_STATUSES } from 'common/constants';

export const personState = {
  name: '',
  status: PERSON_POST_STATUSES.IN_PROGRESS,
  biography: {
    documentId: null
  },
  portrait: '',
  professions: [],
  permissions: []
};
