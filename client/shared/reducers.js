import { actionTypes } from './actions';

export const initialState = {
  user: null,
  isAdmin: false,
  isAuthor: false,
  isReviewer: false,

  offset: 0,
  searchTerm: '',
  sort: 'ascending'
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

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_USER: 
      return setUserState(state, payload)

    case actionTypes.UPDATE_SEARCH_TERM: 
    case actionTypes.UPDATE_SORT:
    case actionTypes.UPDATE_PAGINATION:
      return {
        ...state,
        ...payload
      }

    default:
      return state
  }
}

export default reducer;