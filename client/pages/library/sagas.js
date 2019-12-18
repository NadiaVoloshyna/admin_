import { call, delay, put, take, takeLatest } from 'redux-saga/effects';
import MediaApi from './api';

import { 
  actionTypes,
  actions
} from './actions';

function * fetchMedia ({ payload }) {
  try {
    const response = yield MediaApi.fetchMedia(payload);

    if (response.status === 200) {
      const { resources } = yield response.json()
      yield put(actions.fetchMediaSuccess(resources));
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    console.log(error);
    yield put(actions.fetchMediaFail(error));
  }
}

export const librarySagas = [
  takeLatest(actionTypes.FETCH_MEDIA, fetchMedia)
];