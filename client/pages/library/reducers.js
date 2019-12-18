import { actionTypes } from './actions';

export const initialState = {
  pageConfig: {
    isLoading: false
  },
  media: []
}

const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case actionTypes.LIBRARY_INITIAL_STATE:
      return payload;

    case actionTypes.FETCH_MEDIA_SUCCESS:
      return {
        ...state,
        media: payload
      }

    default:
      return state
  }
}

export default reducer;