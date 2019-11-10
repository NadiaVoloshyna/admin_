export const actionTypes = {
  PROFESSIONS_INITIAL_STATE: 'PROFESSIONS_INITIAL_STATE',
  
  GET_PROFESSIONS: 'GET_PROFESSIONS',
  GET_PROFESSIONS_SUCCESS: 'GET_PROFESSIONS_SUCCESS',
  GET_PROFESSIONS_FAIL: 'GET_PROFESSIONS_FAIL',

  CREATE_PROFESSION: 'CREATE_PROFESSION',
  CREATE_PROFESSION_SUCCESS: 'CREATE_PROFESSION_SUCCESS',
  CREATE_PROFESSION_FAIL: 'CREATE_PROFESSION_FAIL'
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