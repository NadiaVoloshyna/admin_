import { select, call, delay, put, take, takeLatest } from 'redux-saga/effects';
import API from './api';
import { actionTypes, actions } from './actions';

function * registerUser ({ payload }) {
  try {
    const response = yield API.register(payload);

    if (response.status === 302) {
      window.location = 'login';
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    console.log(err)
    yield put(actions.registerUserFail(err));
  }
}

export const registerSagas = [
  takeLatest(actionTypes.REGISTER_USER, registerUser),
];