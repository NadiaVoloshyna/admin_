import { combineReducers } from 'redux';

import person from 'pages/person/reducers';
import persons from 'pages/persons/reducers';
import professions from 'pages/professions/reducers';
import user from 'shared/reducers/user';
import users from 'pages/users/reducers';
import library from 'pages/library/reducers';

export default combineReducers({
  user,
  person,
  persons,
  professions,
  users,
  library
})