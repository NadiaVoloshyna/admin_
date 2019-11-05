import { actionTypes } from '../actions/person';

export const initialState = {
  persons: []
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
    case 'PERSONS_INITIAL_STATE':
      return payload;

    case actionTypes.GET_PERSONS_SUCCESS:
      return {
        ...state,
        persons: payload
      }

    case actionTypes.DELETE_PERSONS_SUCCESS:
      return deletePersons(state, payload);

    default:
      return state
  }
}

export default reducer;