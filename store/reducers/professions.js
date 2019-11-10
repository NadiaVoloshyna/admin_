import { actionTypes } from '../actions/person';

export const initialState = {
  professions: [],
  pagination: {
    offset: 0
  },
  searchTerm: '',
  sort: 'ascending'
}

const updatePagination = (state, props) => {
  return {
    ...state,
    pagination: {
      ...state.pagination,
      ...props
    }
  }
}

const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case actionTypes.PROFESSIONS_INITIAL_STATE:
      return payload;

    case actionTypes.GET_PROFESSIONS_SUCCESS:
      return {
        ...state,
        professions: payload.professions,
        pagination: payload.pagination
      }

    case actionTypes.CREATE_PROFESSION_SUCCESS:
      // Move this to backend
      const professions = state.professions;
      professions.push(payload);

      return {
        ...state,
        professions
      }

    case actionTypes.UPDATE_PAGINATION:
      return updatePagination(state, payload);

    case actionTypes.UPDATE_SEARCH_TERM: 
    case actionTypes.UPDATE_SORT:
      return {
        ...state,
        ...payload
      }

    default:
      return state
  }
}

export default reducer;