import { select, call, delay, put, take, takeLatest } from 'redux-saga/effects'
import { personApi } from 'api';

import { 
  actionTypes,
  actionCreator,
} from './actions';

function * createProfession ({ payload }) {
  try {
    const res = yield personApi.createProfession(payload);
    const { data } = yield res.json();
    const { createProfession } = data;
    
    yield put(actionCreator(actionTypes.CREATE_PROFESSION_SUCCESS, createProfession));
  } catch (err) {
    yield put(actionCreator(actionTypes.CREATE_PROFESSION_FAIL, err));
  }
}

function * getProfessions () {
  const professions = yield select(state => state.professions);
  const { pagination, searchTerm, sort } = professions;
  
  try {
    const res = yield personApi.getProfessions(pagination.offset, searchTerm, sort);
    const { data: { professions } } = yield res.json();
    
    yield put(actionCreator(actionTypes.GET_PROFESSIONS_SUCCESS, professions));
  } catch (err) {
    yield put(actionCreator(actionTypes.GET_PROFESSIONS_FAIL, err));
  }
}

export const professionsSagas = [
  takeLatest(actionTypes.CREATE_PROFESSION, createProfession),
  takeLatest(actionTypes.GET_PROFESSIONS, getProfessions),
];