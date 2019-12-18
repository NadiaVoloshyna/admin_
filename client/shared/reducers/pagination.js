import { actionTypes } from '../actions';

export const paginationState = () => ({
  offset: 0,
  searchTerm: '',
  sort: 'ascending'
})

export const paginationReducers = (state, { type, payload }) => {
  switch (type) {
    case actionTypes.UPDATE_PAGINATION:
    case actionTypes.UPDATE_SEARCH_TERM: 
    case actionTypes.UPDATE_SORT:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...payload
        }
      }

    default:
      return state
  }
}