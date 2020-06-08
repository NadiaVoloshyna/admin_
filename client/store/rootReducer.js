import { combineReducers } from 'redux';

import professions from 'pages/Professions/reducers';
import user from 'shared/reducers/user';
import users from 'pages/users/reducers';
import library from 'pages/Library/reducers';
import shared from 'shared/reducers';

export default combineReducers({
  user,
  professions,
  users,
  library,
  shared
})