import { combineReducers } from 'redux';
import person from 'pages/person/reducers';
import persons from 'pages/persons/reducers';
import professions from 'pages/professions/reducers';

export default combineReducers({
  person,
  persons,
  professions
})