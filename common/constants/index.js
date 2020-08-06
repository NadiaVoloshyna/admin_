const USER_ROLES = {
  SUPER: 'super',
  ADMIN: 'admin',
  AUTHOR: 'author',
  REVIEWER: 'reviewer'
};

const LOG_TYPE = {
  API: 'api',
  CLIENT: 'client'
};

const HTTP_HEADERS = {
  X_TRACE_ID: 'x-trace-id',
};

const PERSON_POST_STATUSES = {
  NEW: 'NEW',
  IN_PROGRESS: 'IN_PROGRESS',
  IN_REVIEW: 'IN_REVIEW',
  READY: 'READY',
  PUBLISHED: 'PUBLISHED'
};

module.exports = {
  USER_ROLES,
  LOG_TYPE,
  HTTP_HEADERS,
  PERSON_POST_STATUSES
};
