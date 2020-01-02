import { actionTypes } from '../actions';

const initialState = {
  isLoading: false,
};

const sharedReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.TOGGLE_IS_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading
      }

    default:
      return state
  }
}

export default sharedReducers;