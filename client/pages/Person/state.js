import { PERSON_POST_STATUSES } from 'shared/constants';

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
