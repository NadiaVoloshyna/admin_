import { select, call, delay, put, take, takeLatest } from 'redux-saga/effects';
import API from './api';
import { actionTypes, actions } from './actions';

function * registerUser ({ payload }) {
  try {
    const response = yield API.register(payload);
    const { data: { status } } = yield response.json();
    
    yield put(actions.registerUserSuccess(status));
  } catch (err) {
    console.log(err)
    yield put(actions.registerUserFail(err));
  }
}

export const registerSagas = [
  takeLatest(actionTypes.REGISTER_USER, registerUser),
];