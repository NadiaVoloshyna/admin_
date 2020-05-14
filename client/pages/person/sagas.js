import { call, delay, put, take, takeLatest } from 'redux-saga/effects';
import PersonApi from './api';

import { actionTypes, actions } from './actions';
import { actions as sharedActions } from 'shared/actions';

function * getPerson ({ payload }) {
  sharedActions.toggleIsLoading();

  try {
    const response = yield PersonApi.getPerson(payload);
    const person = yield response.json();
    
    yield put(actions.getPersonSuccess(person));
  } catch (err) {
    yield put(actions.getPersonFail(err));
  } finally {
    sharedActions.toggleIsLoading();
  }
}

function * updatePerson ({ payload }) {
  sharedActions.toggleIsLoading();

  try {
    const response = yield PersonApi.update(payload);
    
    if (response.status === 200) {
      yield put(actions.updatePersonSuccess(payload));
    }

    if (response.status === 500) {
      throw Error(response.message);
    }
  } catch (error) {
    console.error(error);
  } finally {
    sharedActions.toggleIsLoading();
  }
}

function * uploadPortrait ({ payload }) {
  sharedActions.toggleIsLoading();

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
  } finally {
    sharedActions.toggleIsLoading();
  }
}

export const personSagas = [
  takeLatest(actionTypes.GET_PERSON, getPerson),
  takeLatest(actionTypes.UPLOAD_PORTRAIT, uploadPortrait),
  takeLatest(actionTypes.UPDATE_PERSON, updatePerson),
];