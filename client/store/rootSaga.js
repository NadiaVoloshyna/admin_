import { all } from 'redux-saga/effects';

import { usersSagas } from 'pages/users/sagas';
import { registerSagas } from 'pages/Auth/Register/sagas';

export default function* rootSaga() {
  yield all([
    ...usersSagas,
    ...registerSagas
  ]);
}
