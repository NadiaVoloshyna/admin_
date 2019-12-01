import actionCreator from 'utils/actionCreator';

export const actionTypes = {
  SET_USER: 'SET_USER',
  
  UPDATE_PAGINATION: 'UPDATE_PAGINATION',
  UPDATE_SEARCH_TERM: 'UPDATE_SEARCH_TERM',
  UPDATE_SORT: 'UPDATE_SORT',
}

export const actions = actionCreator(actionTypes);