import { all } from 'redux-saga/effects';

import { registerSagas } from 'pages/Auth/Register/sagas';

export default function* rootSaga() {
  yield all([
    ...registerSagas
  ]);
}
