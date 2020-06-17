import { combineReducers } from 'redux';

import user from 'shared/reducers/user';
import library from 'pages/Library/reducers';
import shared from 'shared/reducers';

export default combineReducers({
  user,
  library,
  shared
})