import { all } from 'redux-saga/effects'

import { personSagas } from 'pages/Person/sagas';
import { professionsSagas } from 'pages/Professions/sagas';
import { usersSagas } from 'pages/users/sagas';
import { registerSagas } from 'pages/register/sagas';

export default function * rootSaga() {
  yield all([
    ...personSagas,
    ...professionsSagas,
    ...usersSagas,
    ...registerSagas
  ])
}