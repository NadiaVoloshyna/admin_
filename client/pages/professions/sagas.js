import { select, call, delay, put, take, takeLatest } from 'redux-saga/effects'
import { personApi } from 'api';

import { 
  actionTypes,
  actions,
} from './actions';

function * createProfession ({ payload }) {
  try {
    const res = yield personApi.createProfession(payload);
    const { data } = yield res.json();
    const { createProfession } = data;
    
    yield put(actions.createProfessionSuccess(createProfession));
  } catch (err) {
    yield put(actions.createProfessionFail(err));
  }
}

function * getProfessions () {
  const professions = yield select(state => state.professions);
  const { pagination, searchTerm, sort } = professions;
  
  try {
    const res = yield personApi.getProfessions(pagination.offset, searchTerm, sort);
    const { data: { professions } } = yield res.json();
    
    yield put(actions.getProfessionsSuccess(professions));
  } catch (err) {
    yield put(actions.getProfessionsFail(err));
  }
}

export const professionsSagas = [
  takeLatest(actionTypes.CREATE_PROFESSION, createProfession),
  takeLatest(actionTypes.GET_PROFESSIONS, getProfessions),
];