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
    const response = yield PersonApi.upload(payload);
    const imageId = yield response.json();
    
    if (response.status === 200) {
      yield put(actions.uploadPortraitSuccess(imageId));
    }

    if (response.status === 500) {
      throw new Error(response.message);
    }
  } catch (error) {
    console.error(error);
    yield put(actions.uploadPortraitFail(error));
  }
}

export const personSagas = [
  takeLatest(actionTypes.GET_PERSON, getPerson),
  takeLatest(actionTypes.UPLOAD_PORTRAIT, uploadPortrait),
  takeLatest(actionTypes.UPDATE_PERSON, updatePerson)
];