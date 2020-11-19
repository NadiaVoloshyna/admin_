export const PAGE_NAMES = {
  DASHBOARD: 'Dashboard',
  LIBRARY: 'Library',
  PERMISSIONS: 'Permissions',
  PERSON: 'Person',
  PERSONS: 'Persons',
  PROFESSIONS: 'Professions',
  USERS: 'Users',
};

export const ASSET_TYPES = {
  FOLDER: 'FOLDER',
  ALBUM: 'ALBUM',
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  SONG: 'SONG'
};

export const INSERTIONS = {
  USER_ROLE: 'USER_ROLE'
};

export const SUCCESS_MESSAGES = {
  PERSON_SAVE: 'Person succesfully saved.',
  USERS_INVITE_USER: 'Invitation was sent.',
  USERS_EDIT_USER: 'Changes were saved successfully.',
  PERSON_STATUS_UPDATE: 'Status was updated successfully.'
};

export const ERROR_MESSAGES = {
  PERSON_ASSIGN_USER: 'We are sorry, we couldn\'t assign user at this time. Please try again later.',
  PERSON_GET_USERS_FOR_ASSIGNMENT: 'We are sorry, there was a problem getting users for assignment.',
  PERSON_UPDATE_STATUS: 'We are sorry, but we couldn\'t update the status of the post.',
  PERSON_SAVE: 'Unfortunatelly there was a problem saving person. Please try again later.',
  PERSON_GET_ACTIVITY: 'There was a problem fetching person\'s activity',
  LIBRARY_CREATE_ASSET: 'We are sorry, we couldn\'t create your asset.',
  PERSONS_GET_PERSONS: 'We are sorry, there was a problem retreaving persons.',
  PERSONS_DELETE_PERSONS: 'We are sorryr, there was a problem deleting persons.',
  PERSONS_CREATE_PERSON: 'We are sorry, there was a problem creating a person.',
  PROFESSIONS_CREATE_PROFESSION: 'We are sorry, we couldn\'t create a profession.',
  PROFESSIONS_GET_PROFESSIONS: 'We are sorry, there was a problem retreaving professions.',
  PROFESSIONS_DELETE_PROFESSIONS: 'We are sorry, there was a problem deleting professions.',
  USERS_INVITE_USER: 'We are sorry, there was a problem inviting user.',
  USERS_EDIT_USER: 'We are sorry, there was a problem editing user.',
  ASSET_UPLOAD_IMAGE: 'We are sorry, there was a problem uploading the image.',
  LIBRARY_FILE_DELETE: 'We are sorry, there was a problem deleting the file.',
  LIBRARY_FILE_MOVE: 'We are sorry, there was a problem moving the file.',
  PERMISSION_UPDATE: 'We are sorry, there was a problem updating permission',
  PERMISSION_CREATE: 'We are sorry, there was a problem creating permissions',
  PERMISSION_DELETE: 'We are sorry, there was a problem deleting permissions'
};

export const WARNING_MESSAGES = {
  PROFESSIONS_DUPLICATE_PROFESSION: 'This profession already exists'
};
