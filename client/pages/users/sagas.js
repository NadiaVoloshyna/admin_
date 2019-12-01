import { select, put, takeLatest } from 'redux-saga/effects';
import UserAPI from './api';

import { 
  actionTypes,
  actions
} from './actions';

function * getUsers () {
  const sharedState = yield select(state => state.shared);
  const { offset, searchTerm, sort } = sharedState;

  try {
    const response = yield UserAPI.getUsers(offset, searchTerm, sort);
    const users = yield response.json();
    
    if (response.status === 200) {
      yield put(actions.getUsersSuccess(users));
    }

    if (response.status === 500) {
      throw Error(response.message);
    }
  } catch (error) {
    console.log(error);
    yield put(actions.getUsersFail(error));
  }
}

function * loginUser ({ payload }) {
  try {
    const res = yield UserAPI.login(payload);
    const { data: { status } } = yield res.json();

    if (status === 'success') {
      yield put(actions.loginUserSuccess());
    } else {
      yield put(actions.loginUserFail());
    }
  } catch (error) {
    yield put(actions.loginUserFail(error));
  }
}


function * inviteUser ({ payload }) {
  try {
    const { email, role } = payload;
    const response = yield UserAPI.invite(email, role);

    if (response.status === 200) {
      yield put(actions.inviteUserSuccess());
    } else {
      yield put(actions.inviteUserFail());
    }
  } catch (error) {
    console.log(error);
    yield put(actions.inviteUserFail(error));
  }
}

export const usersSagas = [
  takeLatest(actionTypes.GET_USERS, getUsers),
  takeLatest(actionTypes.LOGIN_USER, loginUser),
  takeLatest(actionTypes.INVITE_USER, inviteUser)
];