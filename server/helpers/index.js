const { PERSON_POST_STATUSES } = require('../../common/constants');
const { GOOGLE_USER_ROLES } = require('../constants');

/**
 * Creates context for model hooks
 * @param {Object} req HTTP request
 */
exports.getHooksContext = (req) => {
  return {
    route: req.route.path,
    user: req.user,
  };
};

/**
 * Gets a user's role for google drive document
 *   based on person status and current user's role
 * @param {String} status current status of the document
 * @param {String} role current user role
 */
exports.getRoleToUpdate = (status, role) => {
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
