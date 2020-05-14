import { actionTypes } from './actions';
import { paginationState, paginationReducers } from 'shared/reducers/pagination';

export const initialState = {
  persons: [],
  pagination: paginationState()
}

const deletePersons = (state, ids) => {
  return {
    ...state,
    persons: state.persons.
      filter(person => ids.indexOf(person._id) === -1)
  }
}

const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case actionTypes.PERSONS_INITIAL_STATE:
      return payload;

    case actionTypes.GET_PERSONS_SUCCESS:
      return {
        ...state,
        persons: payload.persons,
        pagination: {
          ...state.pagination,
          ...payload.pagination
        }
      }

    case actionTypes.DELETE_PERSONS_SUCCESS:
      return deletePersons(state, payload);

    default:
      return paginationReducers(state, { type, payload });
  }
}

export default reducer;