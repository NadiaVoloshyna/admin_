import { call, delay, put, take, takeLatest } from 'redux-saga/effects'
import { personApi } from 'api';

import { 
  actionTypes,
  actionCreator,
} from '../actions/person';

function * getPersons () {
  try {
    const res = yield personApi.getPersons();
    const { data: { persons } } = yield res.json()
    
    yield put(actionCreator(actionTypes.GET_PERSONS_SUCCESS, persons));
  } catch (err) {
    yield put(actionCreator(actionTypes.GET_PERSONS_FAIL, err));
  }
}

function * deletePersons ({payload: idsToDelete}) {
  try {
    const res = yield personApi.deletePersons(idsToDelete);
    const { data: { deletePersons } } = yield res.json()
    
    if (deletePersons === 'success') {
      yield put(actionCreator(actionTypes.DELETE_PERSONS_SUCCESS, idsToDelete));
    } else {
      yield put(actionCreator(actionTypes.DELETE_PERSONS_FAILED, 'Failure'));
    }
  } catch (err) {
    yield put(actionCreator(actionTypes.DELETE_PERSONS_FAILED, err));
  }
}

export const personsSagas = [
  takeLatest(actionTypes.GET_PERSONS, getPersons),
  takeLatest(actionTypes.DELETE_PERSONS, deletePersons)
];