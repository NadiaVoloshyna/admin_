import { all } from 'redux-saga/effects'

import { personSagas } from 'pages/person/sagas';
import { personsSagas } from 'pages/persons/sagas';
import { professionsSagas } from 'pages/professions/sagas';

export default function * rootSaga() {
  yield all([
    ...personSagas,
    ...personsSagas,
    ...professionsSagas
  ])
}