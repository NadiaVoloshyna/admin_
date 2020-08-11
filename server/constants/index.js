const USER_ROLES = {
  REVIEWER: 'reviewer',
  AUTHOR  : 'author',
  ADMIN   : 'admin',
  SUPER   : 'super'
};

const GOOGLE_USER_ROLES = {
  AUTHOR: 'writer',
  REVIEWER: 'commenter',
  READER: 'reader'
};

const FROM_GOOGLE_ROLES = {
  WRITER: 'author',
  COMMENTER: 'reviewer',
  READER: 'reader'
};

const ASSET_ACTIONS = {
  MOVE: 'move',
  COPY: 'copy',
  DELETE: 'delete'
};

module.exports = {
  USER_ROLES,
  GOOGLE_USER_ROLES,
  FROM_GOOGLE_ROLES,
  ASSET_ACTIONS,
};
