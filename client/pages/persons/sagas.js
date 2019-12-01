import { select, call, delay, put, take, takeLatest } from 'redux-saga/effects'
import PersonApi from './api';

import { 
  actionTypes,
  actions,
} from './actions';

function * getPersons () {
  const sharedState = yield select(state => state.shared);
  const { offset, searchTerm, sort } = sharedState;

  try {
    const response = yield PersonApi.getPersons(offset, searchTerm, sort);
    const data = yield response.json();
    
    yield put(actions.getPersonsSuccess(data));
  } catch (error) {
    console.error(error);
    yield put(actions.getPersonsFail(error));
  }
}

function * deletePersons ({payload: personsToDelete}) {
  const ids = personsToDelete.map(id => id._id);
  const documentIds = personsToDelete.map(id => id.biography.documentId);

  try {
    const response = yield PersonApi.deletePersons(ids, documentIds);
    if (response.status === 200) {
      yield put(actions.deletePersonsSuccess(ids));
    } else {
      yield put(actions.deletePersonsFailed());
    }
  } catch (err) {
    yield put(actions.deletePersonsFailed(err));
  }
}

export const personsSagas = [
  takeLatest(actionTypes.GET_PERSONS, getPersons),
  takeLatest(actionTypes.DELETE_PERSONS, deletePersons)
];