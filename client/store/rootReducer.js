import { combineReducers } from 'redux';

import user from 'shared/reducers/user';
import users from 'pages/users/reducers';
import library from 'pages/Library/reducers';
import shared from 'shared/reducers';

export default combineReducers({
  user,
  users,
  library,
  shared
})