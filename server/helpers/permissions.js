const { PERSON_POST_STATUSES } = require('../../common/constants');
const { GOOGLE_USER_ROLES } = require('../constants');

const getRoleToUpdate = (status, role) => {
  switch (status) {
    case PERSON_POST_STATUSES.IN_PROGRESS:
      if (role === 'author') return GOOGLE_USER_ROLES.AUTHOR;
      if (role === 'reviewer') return GOOGLE_USER_ROLES.READER;
      break;
    case PERSON_POST_STATUSES.IN_REVIEW:
      if (role === 'author') return GOOGLE_USER_ROLES.READER;
      if (role === 'reviewer') return GOOGLE_USER_ROLES.REVIEWER;
      break;
    default:
      if (role === 'author') return GOOGLE_USER_ROLES.READER;
      if (role === 'reviewer') return GOOGLE_USER_ROLES.READER;
      break;
  }
};

module.exports = {
  getRoleToUpdate
};
