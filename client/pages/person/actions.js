import actionCreator from 'utils/actionCreator';

export const actionTypes = {
  PERSON_INITIAL_STATE: 'PERSON_INITIAL_STATE',
  
  GET_PERSON: 'GET_PERSON',
  GET_PERSON_SUCCESS: 'GET_PERSON_SUCCESS',
  GET_PERSON_FAIL: 'GET_PERSON_FAIL',

  UPDATE_PERSON: 'UPDATE_PERSON',
  UPDATE_PERSON_SUCCESS: 'UPDATE_PERSON_SUCCESS',
  UPDATE_PERSON_FAIL: 'UPDATE_PERSON_FAIL',

  SHOW_DUPLICATE_PERSON_MODAL: 'SHOW_DUPLICATE_PERSON_MODAL',
  SET_DUPLICATE_DATA: 'SET_DUPLICATE_DATA',

  UPLOAD_PORTRAIT: 'UPLOAD_PORTRAIT',
  UPLOAD_PORTRAIT_SUCCESS: 'UPLOAD_PORTRAIT_SUCCESS',

  TOGGLE_IS_LOADING: 'TOGGLE_IS_LOADING',

  SELECT_PROFESSION: 'SELECT_PROFESSION',
  DELETE_PROFESSION: 'DELETE_PROFESSION',
}

export const actions = actionCreator(actionTypes);