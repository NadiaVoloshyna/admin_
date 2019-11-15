export const actionTypes = {
  GET_PERSON: 'GET_PERSON',
  GET_PERSON_SUCCESS: 'GET_PERSON_SUCCESS',
  GET_PERSON_FAIL: 'GET_PERSON_FAIL',

  CREATE_PERSON: 'CREATE_PERSON',
  CREATE_PERSON_SUCCESS: 'CREATE_PERSON_SUCCESS',
  CREATE_PERSON_FAIL: 'CREATE_PERSON_FAIL',

  UPDATE_PERSON: 'UPDATE_PERSON',

  SHOW_DUPLICATE_PERSON_MODAL: 'SHOW_DUPLICATE_PERSON_MODAL',
  SET_DUPLICATE_DATA: 'SET_DUPLICATE_DATA',

  UPLOAD_PORTRAIT: 'UPLOAD_PORTRAIT',
  UPLOAD_PORTRAIT_SUCCESS: 'UPLOAD_PORTRAIT_SUCCESS',

  TOGGLE_IS_LOADING: 'TOGGLE_IS_LOADING'
}

export const actionCreator = (actionName, payload) => {
  if (!actionTypes[actionName]) {
    throw new Error(`Couldn't find action: ${actionName} in actions`);
  }
  
  return {
    type: actionName,
    payload
  }
}