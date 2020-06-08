import { all } from 'redux-saga/effects'

import { professionsSagas } from 'pages/Professions/sagas';
import { usersSagas } from 'pages/users/sagas';
import { registerSagas } from 'pages/Auth/Register/sagas';

export default function * rootSaga() {
  yield all([
    ...professionsSagas,
    ...usersSagas,
    ...registerSagas
  ])
}
