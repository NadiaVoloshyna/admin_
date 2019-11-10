export const actionTypes = {
  PERSONS_INITIAL_STATE: 'PERSONS_INITIAL_STATE',
  
  GET_PERSONS: 'GET_PERSONS',
  GET_PERSONS_SUCCESS: 'GET_PERSONS_SUCCESS',
  GET_PERSONS_FAIL: 'GET_PERSONS_FAIL',

  DELETE_PERSONS: 'DELETE_PERSONS',
  DELETE_PERSONS_SUCCESS: 'DELETE_PERSONS_SUCCESS',
  DELETE_PERSONS_FAILED: 'DELETE_PERSONS_FAILED',

  UPDATE_PAGINATION: 'UPDATE_PAGINATION',
  UPDATE_SEARCH_TERM: 'UPDATE_SEARCH_TERM',
  UPDATE_SORT: 'UPDATE_SORT',
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