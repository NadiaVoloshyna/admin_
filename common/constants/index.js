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

module.exports = {
  USER_ROLES,
  LOG_TYPE,
  HTTP_HEADERS
};
