import { actionTypes } from './actions';
import { paginationState, paginationReducers } from 'shared/reducers/pagination';

export const initialState = {
  professions: [],
  pagination: paginationState()
}

const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case actionTypes.PROFESSIONS_INITIAL_STATE:
      return payload;

    case actionTypes.GET_PROFESSIONS_SUCCESS:
      return {
        ...state,
        professions: payload.professions,
        pagination: {
          ...state.pagination,
          ...payload.pagination
        }
      }

    case actionTypes.CREATE_PROFESSION_SUCCESS:
      // Move this to backend
      const professions = state.professions;
      professions.push(payload);

      return {
        ...state,
        professions
      }

    default:
      return paginationReducers(state, { type, payload });
  }
}

export default reducer;