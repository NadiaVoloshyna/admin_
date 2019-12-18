import { actionTypes } from '../actions';

export const initialState = {
  user: null,
  isAdmin: false,
  isAuthor: false,
  isReviewer: false,
}

const setUserState = (state, user) => {
  return {
    ...state,
    user,
    isAdmin: user.role === 'admin',
    isAuthor: user.role === 'author',
    isReviewer: user.role === 'reviewer',
  }
}

const userReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_USER: 
      return setUserState(state, payload)

    default:
      return state
  }
}

export default userReducers;