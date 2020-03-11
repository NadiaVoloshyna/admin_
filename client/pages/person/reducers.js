import { actionTypes } from './actions';
import { PERSON_POST_STATUSES } from 'shared/constants';

const initialState = {
  pageConfig: {},
  person: {
    name: '',
    status: PERSON_POST_STATUSES.IN_PROGRESS,
    biography: {
      documentId: null
    },
    portrait: '',
    professions: [],
    permissions: []
  },
  duplicate: {
    id: null,
    name: null
  },
  showDuplicatePersonModal: false
}

const selectProfession = (state, profession) => {
  const newProfession = {
    id: profession._id,
    active: false,
    media: []
  }
  return {
    ...state,
    person: {
      ...state.person,
      professions: [
        ...state.person.professions,
        newProfession
      ]
    }
  }
}

const deleteProfession = (state, profession) => {
  const professions = state.person.professions;
  const index = professions.indexOf(profession);
  if (index !== -1) professions.splice(index, 1);

  return {
    ...state,
    person: {
      ...state.person,
      professions
    }
  }
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'PERSON_INITIAL_STATE':
      return payload;

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
    
    case actionTypes.SELECT_PROFESSION:
      return selectProfession(state, payload);

    case actionTypes.DELETE_PROFESSION:
      return deleteProfession(state, payload);

    case actionTypes.SET_STATUS:
      return {
        ...state,
        person: {
          ...state.person,
          status: payload
        }
      }

    case actionTypes.SET_PERMISSION:
      return {
        ...state,
        person: {
          ...state.person,
          permissions: [...state.person.permissions, ...payload]
        }
      }

    default:
      return state
  }
}

export default reducer;