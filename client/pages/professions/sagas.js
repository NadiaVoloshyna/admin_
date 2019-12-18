import { select, call, delay, put, take, takeLatest } from 'redux-saga/effects'
import ProfessionApi from './api';

import { 
  actionTypes,
  actions,
} from './actions';

function * getProfessions () {
  const professionsState = yield select(state => state.professions);
  const { pagination: { offset, searchTerm, sort } } = professionsState;
  
  try {
    const response = yield ProfessionApi.getProfessions(offset, searchTerm, sort);
    const professions = yield response.json();
    
    if (response.status === 200) {
      yield put(actions.getProfessionsSuccess(professions));
    }

    if (response.status === 500) {
      throw new Error(response.message);
    }
  } catch (error) {
    console.error(error);
    yield put(actions.getProfessionsFail(error));
  }
}

function * createProfession ({ payload }) {
  try {
    const response = yield ProfessionApi.create(payload);
    const profession = yield response.json();
    
    if (response.status === 201) {
      yield put(actions.createProfessionSuccess(profession));
    }

    if (response.status === 409) {
      console.log('Duplicate profession');
    }
    
    if (response.status === 500) {
      throw new Error(response.message);
    }
  } catch (error) {
    console.error(error);
    yield put(actions.createProfessionFail(error));
  }
}

export const professionsSagas = [
  takeLatest(actionTypes.CREATE_PROFESSION, createProfession),
  takeLatest(actionTypes.GET_PROFESSIONS, getProfessions),
];