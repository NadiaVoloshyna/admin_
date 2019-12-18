import { actionTypes } from './actions';
import { paginationState, paginationReducers } from 'shared/reducers/pagination';

export const initialState = {
  users: [],
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

    default:
      return paginationReducers(state, { type, payload });
  }
}

export default reducer;