import { actionTypes } from './actions';

export const initialState = {
  persons: [],
  // pagination: {
  //   offset: 0
  // },
  // searchTerm: '',
  // sort: 'ascending'
}

const deletePersons = (state, ids) => {
  return {
    ...state,
    persons: state.persons.
      filter(person => ids.indexOf(person._id) === -1)
  }
}

// const updatePagination = (state, props) => {
//   return {
//     ...state,
//     pagination: {
//       ...state.pagination,
//       ...props
//     }
//   }
// }

const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case actionTypes.PERSONS_INITIAL_STATE:
      return payload;

    case actionTypes.GET_PERSONS_SUCCESS:
      return {
        ...state,
        persons: payload.persons,
        pagination: payload.pagination
      }

    case actionTypes.DELETE_PERSONS_SUCCESS:
      return deletePersons(state, payload);

    // case actionTypes.UPDATE_PAGINATION:
    //   return updatePagination(state, payload);

    // case actionTypes.UPDATE_SEARCH_TERM: 
    // case actionTypes.UPDATE_SORT:
    //   return {
    //     ...state,
    //     ...payload
    //   }

    default:
      return state
  }
}

export default reducer;