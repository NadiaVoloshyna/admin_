import { select, call, delay, put, take, takeLatest } from 'redux-saga/effects'
import ProfessionApi from './api';

import { 
  actionTypes,
  actions,
} from './actions';
import { actions as sharedActions } from 'shared/actions';

function * getProfessions () {
  sharedActions.toggleIsLoading();

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
  } finally {
    sharedActions.toggleIsLoading();
  }
}

function * getAllProfessions () {
  sharedActions.toggleIsLoading();

  try {
    const response = yield ProfessionApi.getAllProfessions();
    const professions = yield response.json();
    
    if (response.status === 200) {
      yield put(actions.getProfessionsSuccess(professions));
    }

    if (response.status === 500) {
      throw new Error(response.message);
    }
  } catch (error) {
    console.error(error);
    yield put(actions.getAllProfessionsFail(error));
  } finally {
    sharedActions.toggleIsLoading();
  }
}

function * createProfession ({ payload }) {
  sharedActions.toggleIsLoading();
  const { value: name } = payload;

  try {
    const response = yield ProfessionApi.create({ name });
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
  } finally {
    sharedActions.toggleIsLoading();
  }
}

function * deleteProfessions ({ payload: professionsToDelete }) {
  sharedActions.toggleIsLoading();
  const ids = professionsToDelete.map(id => id._id);

  try {
    const response = yield ProfessionApi.deleteProfessions(ids);
    if (response.status === 200) {
      yield put(actions.deleteProfessionsSuccess(ids));
    } else {
      yield put(actions.deleteProfessionsFailed());
    }
  } catch (err) {
    yield put(actions.deleteProfessionsFailed(err));
  } finally {
    sharedActions.toggleIsLoading();
  }
}

export const professionsSagas = [
  takeLatest(actionTypes.CREATE_PROFESSION, createProfession),
  takeLatest(actionTypes.GET_PROFESSIONS, getProfessions),
  takeLatest(actionTypes.GET_ALL_PROFESSIONS, getAllProfessions),
  takeLatest(actionTypes.DELETE_PROFESSIONS, deleteProfessions),
];