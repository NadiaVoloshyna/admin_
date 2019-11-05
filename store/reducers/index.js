import { combineReducers } from 'redux';
import person from './person'
import persons from './persons'

export default combineReducers({
  person,
  persons
})