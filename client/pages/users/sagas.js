import { select, put, takeLatest } from 'redux-saga/effects';
import UserAPI from './api';

import { 
  actionTypes,
  actions
} from './actions';
import { actions as sharedActions } from 'shared/actions';

function * getUsers () {
  sharedActions.toggleIsLoading();
  const state = yield select(state => state.users);
  const { pagination: { offset, searchTerm, sort } } = state;

  try {
    const response = yield UserAPI.getUsers(offset, searchTerm, sort);
    const users = yield response.json();
    
    if (response.status === 200) {
      yield put(actions.getUsersSuccess(users));
    } else {
      throw Error(response.message);
    }
  } catch (error) {
    console.log(error);
    yield put(actions.getUsersFail(error));
  } finally {
    sharedActions.toggleIsLoading();
  }
}

function * loginUser ({ payload }) {
  sharedActions.toggleIsLoading();
  yield put(actions.showLoggingErrorMessage());

  try {
    const response = yield UserAPI.login(payload);
    
    if (response.status === 302) {
      window.location = '/';
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    yield put(actions.hideLoggingErrorMessage());
  } finally {
    sharedActions.toggleIsLoading();
  }
}


function * inviteUser ({ payload }) {
  sharedActions.toggleIsLoading();

  try {
    const { email, role } = payload;
    const response = yield UserAPI.invite(email, role);

    if (response.status === 200) {
      yield put(actions.inviteUserSuccess());
    } else {
      throw Error(response.message);
    }
  } catch (error) {
    console.log(error);
    yield put(actions.inviteUserFail(error));
  } finally {
    sharedActions.toggleIsLoading();
  }
}

function * updateUser ({ payload }) {
  sharedActions.toggleIsLoading();

  try {
    const response = yield UserAPI.update(payload);

    if (response.status === 200) {
      yield put(actions.updateUserSuccess(response));
    } else {
      throw Error(response.message);
    }
  } catch (error) {
    console.log(error);
    yield put(actions.updateUserFail(error));
  } finally {
    sharedActions.toggleIsLoading();
  }
}

export const usersSagas = [
  takeLatest(actionTypes.GET_USERS, getUsers),
  takeLatest(actionTypes.LOGIN_USER, loginUser),
  takeLatest(actionTypes.INVITE_USER, inviteUser),
  takeLatest(actionTypes.UPDATE_USER, updateUser)
];