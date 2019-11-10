import { combineReducers } from 'redux';
import person from './person';
import persons from './persons';
import professions from './professions';

export default combineReducers({
  person,
  persons,
  professions
})