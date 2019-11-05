import { all } from 'redux-saga/effects'

import { personSagas } from './person';
import { personsSagas } from './persons';

export default function * rootSaga() {
  yield all([
    ...personSagas,
    ...personsSagas
  ])
}