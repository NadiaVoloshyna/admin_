import { call, delay, put, take, takeLatest } from 'redux-saga/effects'
//import es6promise from 'es6-promise'
import { personApi } from 'api';

import { 
  actionTypes,
  getPersonSuccess, 
  getPersonFailed,
  createPersonSuccess,
  createPersonFailed,
  actionCreator
} from '../actions/person';

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
    if (error.code === 409) {
      yield put(actionCreator(actionTypes.SHOW_DUPLICATE_PERSON_MODAL, true));
    } else {
      // General error
      //yield put(actionCreator(actionTypes.CREATE_PERSON_FAIL, error));
    }
  }
}

export const personSagas = [
  takeLatest(actionTypes.GET_PERSON, getPerson),
  takeLatest(actionTypes.CREATE_PERSON, createPerson),
  //takeLatest(actionTypes.UPDATE_PERSON, updatePerson)
];