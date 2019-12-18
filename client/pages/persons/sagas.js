import { select, call, delay, put, take, takeLatest } from 'redux-saga/effects'
import PersonApi from './api';

import { 
  actionTypes,
  actions,
} from './actions';

function * getPersons () {
  const personsState = yield select(state => state.persons);
  const { pagination: { offset, searchTerm, sort } } = personsState;

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

function * createPerson ({ payload }) {
  try {
    yield put(actions.toggleIsLoading(true));

    const response = yield PersonApi.create(payload);
    const person = yield response.json();

    if (response.status === 301 || response.status === 302) {
      yield put(actions.toggleIsLoading(false));
      window.location = `persons/${person.id}`;
      return;
    }
    
    if (response.status === 409) {
      yield put(actions.setDuplicateData({
        id: person.id,
        name: person.name
      }))
      yield put(actions.showDuplicatePersonModal(true));
    }

    if (response.status === 500) {
      throw Error(response.message);
    }
  } catch (error) {
    console.error(error);
  }
}

export const personsSagas = [
  takeLatest(actionTypes.GET_PERSONS, getPersons),
  takeLatest(actionTypes.CREATE_PERSON, createPerson),
  takeLatest(actionTypes.DELETE_PERSONS, deletePersons)
];