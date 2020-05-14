const PERSON_POST_STATUSES = {
  NEW: 'NEW',
  IN_PROGRESS: 'IN_PROGRESS',
  AWAITS_REVIEW: 'AWAITS_REVIEW',
  IN_REVIEW: 'IN_REVIEW',
  READY_TO_PUBLISH: 'READY_TO_PUBLISH',
  PUBLISHED: 'PUBLISHED'
}

const USER_ROLES = {
  REVIEWER: 'reviewer',
  AUTHOR  : 'author',
  ADMIN   : 'admin',
  SUPER   : 'super'
}

const GOOGLE_USER_ROLES = {
  AUTHOR: 'writer',
  REVIEWER: 'commenter',
  READER: 'reader'
}

const FROM_GOOGLE_ROLES = {
  WRITER: 'author',
  COMMENTER: 'reviewer',
  READER: 'reader'
}

module.exports = {
  PERSON_POST_STATUSES,
  USER_ROLES,
  GOOGLE_USER_ROLES,
  FROM_GOOGLE_ROLES
}