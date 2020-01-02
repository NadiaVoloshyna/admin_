import { actionTypes } from './actions';
import { paginationState, paginationReducers } from 'shared/reducers/pagination';

export const initialState = {
  users: [],
  showErrorMessage: false,
  pagination: paginationState()
}

const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case actionTypes.USERS_INITIAL_STATE:
      return payload;

    case actionTypes.GET_USERS_SUCCESS:
      return {
        ...state,
        users: payload.users,
        pagination: {
          ...state.pagination,
          ...payload.pagination
        }
      }

    case actionTypes.SHOW_LOGGING_ERROR_MESSAGE:
      return {
        ...state,
        showErrorMessage: false
      }

    case actionTypes.HIDE_LOGGING_ERROR_MESSAGE:
      return {
        ...state,
        showErrorMessage: true
      }

    default:
      return paginationReducers(state, { type, payload });
  }
}

export default reducer;