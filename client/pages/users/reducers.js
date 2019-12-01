import { actionTypes } from './actions';

export const initialState = {
  users: [],
}

const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case actionTypes.USERS_INITIAL_STATE:
      return payload;

    case actionTypes.GET_USERS_SUCCESS:
      return {
        ...state,
        users: payload.users,
        pagination: payload.pagination
      }

    default:
      return state
  }
}

export default reducer;