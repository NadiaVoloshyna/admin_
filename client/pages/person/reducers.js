import { actionTypes } from './actions';

export const initialState = {
  pageConfig: {
    disableActions: false,
    isLoading: false
  },
  person: {
    name: '',
    biography: {
      documentId: null,
      documentBody: ''
    },
    portrait: '',
  },
  duplicate: {
    id: null,
    name: null
  },
  showDuplicatePersonModal: false
}

const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case 'PERSON_INITIAL_STATE':
      return payload;
      
    case 'TOGGLE_ACTIONS':
      return {
        ...state,
        pageConfig: {
          ...state.pageConfig,
          disableActions: !payload
        },
      }

    case actionTypes.TOGGLE_IS_LOADING:
      return {
        ...state,
        pageConfig: {
          ...state.pageConfig,
          isLoading: payload
        }
      }

    case actionTypes.GET_PERSON_SUCCESS:
      return {
        ...state,
        person: payload
      }

    case actionTypes.CREATE_PERSON_SUCCESS:
      return {
        ...state,
        person: {
          ...state.person,
          ...payload
        }
      }

    case actionTypes.UPDATE_PERSON_SUCCESS:
      return {
        ...state,
        person: {
          ...state.person,
          ...payload
        }
      }

    case actionTypes.SET_DUPLICATE_DATA:
      return {
        ...state,
        duplicate: payload
      }

    case actionTypes.SHOW_DUPLICATE_PERSON_MODAL:
      return {
        ...state,
        showDuplicatePersonModal: payload
      }

    case actionTypes.UPLOAD_PORTRAIT_SUCCESS:
      return {
        ...state,
        person: {
          ...state.person,
          portrait: payload
        }
      }

    default:
      return state
  }
}

export default reducer;