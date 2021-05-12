const USER_ROLES = require('./roles');
const PATTERNS = require('./patterns');

const LOG_TYPE = {
  API: 'api',
  CLIENT: 'client',
};

const HTTP_HEADERS = {
  X_TRACE_ID: 'x-trace-id',
};

const PERSON_POST_STATUSES = {
  NEW: 'NEW',
  IN_PROGRESS: 'IN_PROGRESS',
  IN_REVIEW: 'IN_REVIEW',
  IN_EDIT: 'IN_EDIT',
  READY: 'READY',
  ON_HOLD: 'ON_HOLD',
  PUBLISHED: 'PUBLISHED',
};

const ASSET_TYPES = {
  FOLDER: 'FOLDER',
  ALBUM: 'ALBUM',
  IMAGE: 'IMAGE',
  AUDIO: 'AUDIO',
  VIDEO: 'ViDEO',
};

module.exports = {
  USER_ROLES,
  LOG_TYPE,
  HTTP_HEADERS,
  PERSON_POST_STATUSES,
  ASSET_TYPES,
  PATTERNS,
};
