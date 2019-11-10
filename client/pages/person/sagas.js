import { call, delay, put, take, takeLatest } from 'redux-saga/effects'
//import es6promise from 'es6-promise'
import { personApi } from 'api';

import { 
  actionTypes,
  actionCreator
} from './actions';

//es6promise.polyfill()

function * getPerson ({ payload }) {
  try {
    const res = yield personApi.getPerson(payload);
    const { data: { person } } = yield res.json()
    
    yield put(actionCreator(actionTypes.GET_PERSON_SUCCESS, person));
  } catch (err) {
    yield put(actionCreator(actionTypes.GET_PERSON_FAIL, err));
  }
}

function * createPerson ({ payload }) {
  try {
    const res = yield personApi.createPerson(payload);
    const { data, errors } = yield res.json();
    const { createPerson } = data;

    if (errors && errors.length) throw errors[0];
    
    yield put(actionCreator(actionTypes.CREATE_PERSON_SUCCESS, createPerson));
  } catch (error) {
    if (error.extensions.code === 409) {
      yield put(actionCreator(actionTypes.SET_DUPLICATE_DATA, {
        id: error.extensions.exception.duplicateId,
        name: error.extensions.exception.duplicateName
      }))
      yield put(actionCreator(actionTypes.SHOW_DUPLICATE_PERSON_MODAL, true));
    } else {
      // General error
      //yield put(actionCreator(actionTypes.CREATE_PERSON_FAIL, error));
    }
  }
}

function * uploadPortrait ({ payload }) {
  try {
    const res = yield personApi.uploadPortrait(payload);
    const image = yield res.json();
    
    yield put(actionCreator(actionTypes.UPLOAD_PORTRAIT_SUCCESS, image));
  } catch (error) {
    console.error(error);
  }
}

export const personSagas = [
  takeLatest(actionTypes.GET_PERSON, getPerson),
  takeLatest(actionTypes.CREATE_PERSON, createPerson),
  takeLatest(actionTypes.UPLOAD_PORTRAIT, uploadPortrait)
  //takeLatest(actionTypes.UPDATE_PERSON, updatePerson)
];