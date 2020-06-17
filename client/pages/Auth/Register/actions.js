import actionCreator from 'utils/actionCreator';

export const actionTypes = {
  REGISTER_USER        : 'REGISTER_USER',
  REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS',
  REGISTER_USER_FAIL   : 'REGISTER_USER_FAIL'
};

export const actions = actionCreator(actionTypes);
