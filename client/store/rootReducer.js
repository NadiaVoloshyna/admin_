import { combineReducers } from 'redux';

import shared from 'shared/reducers';

import person from 'pages/person/reducers';
import persons from 'pages/persons/reducers';
import professions from 'pages/professions/reducers';
import users from 'pages/users/reducers';

export default combineReducers({
  shared,
  person,
  persons,
  professions,
  users
})