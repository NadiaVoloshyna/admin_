import { all } from 'redux-saga/effects'

import { personSagas } from 'pages/person/sagas';
import { personsSagas } from 'pages/persons/sagas';
import { professionsSagas } from 'pages/professions/sagas';
import { usersSagas } from 'pages/users/sagas';
import { registerSagas } from 'pages/register/sagas';
import { librarySagas } from 'pages/library/sagas';

export default function * rootSaga() {
  yield all([
    ...personSagas,
    ...personsSagas,
    ...professionsSagas,
    ...usersSagas,
    ...registerSagas,
    ...librarySagas
  ])
}