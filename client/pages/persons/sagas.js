import { select, call, delay, put, take, takeLatest } from 'redux-saga/effects'
import { personApi } from 'api';

import { 
  actionTypes,
  actionCreator,
} from './actions';

function * getPersons () {
  const persons = yield select(state => state.persons);
  const { pagination, searchTerm, sort } = persons;

  try {
    const res = yield personApi.getPersons(pagination.offset, searchTerm, sort);
    const { data: { persons } } = yield res.json();
    
    yield put(actionCreator(actionTypes.GET_PERSONS_SUCCESS, persons));
  } catch (err) {
    yield put(actionCreator(actionTypes.GET_PERSONS_FAIL, err));
  }
}

function * deletePersons ({payload: personsToDelete}) {

  const ids = personsToDelete.map(item => item._id);
  const documentIds = personsToDelete.map(item => item.biography.documentId);

  try {
    const res = yield personApi.deletePersons(ids, documentIds);
    const { data: { deletePersons } } = yield res.json()
    
    if (deletePersons === 'success') {
      yield put(actionCreator(actionTypes.DELETE_PERSONS_SUCCESS, ids));
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