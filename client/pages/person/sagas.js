import { call, delay, put, take, takeLatest } from 'redux-saga/effects';
import PersonApi from './api';

import { 
  actionTypes,
  actions
} from './actions';

function * getPerson ({ payload }) {
  try {
    const response = yield PersonApi.getPerson(payload);
    const person = yield response.json()
    yield put(actions.getPersonSuccess(person));
  } catch (err) {
    yield put(actions.getPersonFail(err));
  }
}

function * createPerson ({ payload }) {
  try {
    yield put(actions.toggleIsLoading(true));

    const response = yield PersonApi.create(payload);
    const person = yield response.json();

    if (response.status === 301 || response.status === 302) {
      yield put(actions.toggleIsLoading(false));
      window.location = person.id;
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

function * updatePerson ({ payload }) {
  try {
    const response = yield PersonApi.update(payload);
    
    if (response.status === 200) {
      yield put(actions.updatePersonSuccess(payload));
      yield put(actions.toggleIsLoading(false));
    }

    if (response.status === 500) {
      throw Error(response.message);
    }
  } catch (error) {
    console.error(error);
  }
}

function * uploadPortrait ({ payload }) {
  try {
    const res = yield PersonApi.uploadPortrait(payload);
    const image = yield res.json();
    
    yield put(actions.uploadPortraitSuccess(image));
  } catch (error) {
    console.error(error);
  }
}

export const personSagas = [
  takeLatest(actionTypes.GET_PERSON, getPerson),
  takeLatest(actionTypes.CREATE_PERSON, createPerson),
  takeLatest(actionTypes.UPLOAD_PORTRAIT, uploadPortrait),
  takeLatest(actionTypes.UPDATE_PERSON, updatePerson)
];