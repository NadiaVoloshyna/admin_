const { PERSON_POST_STATUSES, GOOGLE_USER_ROLES } = require('../constants');

const getRoleToUpdate = (status, role) => {
  switch (status) {
    case PERSON_POST_STATUSES.IN_PROGRESS:
      if (role === 'author') return GOOGLE_USER_ROLES.AUTHOR;
      if (role === 'reviewer') return GOOGLE_USER_ROLES.READER;
    case PERSON_POST_STATUSES.AWAITS_REVIEW:
      if (role === 'author') return GOOGLE_USER_ROLES.READER;
      if (role === 'reviewer') return GOOGLE_USER_ROLES.READER;
    case PERSON_POST_STATUSES.IN_REVIEW:
      if (role === 'author') return GOOGLE_USER_ROLES.READER;
      if (role === 'reviewer') return GOOGLE_USER_ROLES.REVIEWER;
    case PERSON_POST_STATUSES.READY_TO_PUBLISH:
      if (role === 'author') return GOOGLE_USER_ROLES.READER;
      if (role === 'reviewer') return GOOGLE_USER_ROLES.READER;
    case PERSON_POST_STATUSES.PUBLISHED:
      if (role === 'author') return GOOGLE_USER_ROLES.READER;
      if (role === 'reviewer') return GOOGLE_USER_ROLES.READER;
    default:
      if (role === 'author') return GOOGLE_USER_ROLES.READER;
      if (role === 'reviewer') return GOOGLE_USER_ROLES.READER;
  }
}

module.exports = {
  getRoleToUpdate
}