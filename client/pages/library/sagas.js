import { call, delay, put, take, takeLatest } from 'redux-saga/effects';
import AssetsApi from './api';

import { 
  actionTypes,
  actions
} from './actions';
import { actions as sharedActions } from 'shared/actions';

function * getAssets ({ payload }) {
  sharedActions.toggleIsLoading();

  try {
    const response = yield AssetsApi.getAssets(payload);

    if (response.status === 200) {
        const assets = yield response.json()
        yield put(actions.getAssetsSuccess(assets));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.log(error);
      yield put(actions.getAssetsFail(error));
    } finally {
      sharedActions.toggleIsLoading();
    }
}

function * createAsset ({ payload }) {
  sharedActions.toggleIsLoading();

  try {
    const response = yield AssetsApi.createAsset(payload);

    if (response.status === 302) {
      const resources = yield response.json()
      yield put(actions.createAssetSuccess(resources));
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    console.log(error);
    yield put(actions.createAssetFail(error));
  } finally {
    sharedActions.toggleIsLoading();
  }
}

function * deleteAsset ({ payload }) {
  sharedActions.toggleIsLoading();

  try {
    const response = yield AssetsApi.deleteAsset(payload);

    if (response.status === 200) {
      yield put(actions.deleteAssetSuccess(payload));
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    yield put(actions.deleteAssetFail(error));
  } finally {
    sharedActions.toggleIsLoading();
  }
}

export const librarySagas = [
  takeLatest(actionTypes.GET_ASSETS, getAssets),
  takeLatest(actionTypes.CREATE_ASSET, createAsset),
  takeLatest(actionTypes.DELETE_ASSET, deleteAsset)
];