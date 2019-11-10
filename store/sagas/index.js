import { all } from 'redux-saga/effects'

import { personSagas } from './person';
import { personsSagas } from './persons';
import { professionsSagas } from './professions';

export default function * rootSaga() {
  yield all([
    ...personSagas,
    ...personsSagas,
    ...professionsSagas
  ])
}