export const actionTypes = {
  GET_PERSON: 'GET_PERSON',
  GET_PERSON_SUCCESS: 'GET_PERSON_SUCCESS',
  GET_PERSON_FAIL: 'GET_PERSON_FAIL',

  GET_PERSONS: 'GET_PERSONS',
  GET_PERSONS_SUCCESS: 'GET_PERSONS_SUCCESS',
  GET_PERSONS_FAIL: 'GET_PERSONS_FAIL',

  CREATE_PERSON: 'CREATE_PERSON',
  CREATE_PERSON_SUCCESS: 'CREATE_PERSON_SUCCESS',
  CREATE_PERSON_FAIL: 'CREATE_PERSON_FAIL',

  UPDATE_PERSON: 'UPDATE_PERSON',

  DELETE_PERSONS: 'DELETE_PERSONS',
  DELETE_PERSONS_SUCCESS: 'DELETE_PERSONS_SUCCESS',
  DELETE_PERSONS_FAILED: 'DELETE_PERSONS_FAILED',
  SHOW_DUPLICATE_PERSON_MODAL: 'SHOW_DUPLICATE_PERSON_MODAL'
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

/** Get single person's data */
export function getPerson (payload) {
  return {
    type: actionTypes.LOAD_DATA_SUCCESS,
    payload
  }
}

export function getPersonSuccess (payload) {
  return {
    type: actionTypes.GET_PERSON_SUCCESS,
    payload
  }
}

export function getPersonFailed (payload) {
  return {
    type: actionTypes.GET_PERSON_FAIL,
    payload
  }
}

/** Get all persons data */
export const getPersons = () => ({ type: actionTypes.GET_PERSONS });

export const getPersonsSuccess = (payload) => ({
    type: actionTypes.GET_PERSONS_SUCCESS,
    payload
});

export const getPersonsFailed = (payload) => ({
    type: actionTypes.GET_PERSONS_FAIL,
    payload
});

/** Create Person */
export const createPerson = (payload) => ({
  type: actionTypes.CREATE_PERSON,
  payload
});

export const createPersonSuccess = (payload) => ({
  type: actionTypes.CREATE_PERSON_SUCCESS,
  payload
});

export const createPersonFailed = (payload) => ({
  type: actionTypes.CREATE_PERSON_FAIL,
  payload
});

/** Update Person */
export const updatePerson = (payload) => ({
  type: actionTypes.UPDATE_PERSON,
  payload
});

/** Delete Persons */
export const deletePersons = (payload) => ({
  type: actionTypes.DELETE_PERSONS,
  payload
});

export const deletePersonsSuccess = (payload) => ({
  type: actionTypes.DELETE_PERSONS_SUCCESS,
  payload
});

export const deletePersonsFailed = (payload) => ({
  type: actionTypes.DELETE_PERSONS_FAILED,
  payload
});