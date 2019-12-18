import actionCreator from 'utils/actionCreator';

export const actionTypes = {
  LIBRARY_INITIAL_STATE: 'LIBRARY_INITIAL_STATE',

  FETCH_MEDIA: 'FETCH_MEDIA',
  FETCH_MEDIA_SUCCESS: 'FETCH_MEDIA_SUCCESS',
  FETCH_MEDIA_FAIL: 'FETCH_MEDIA_FAIL'
}

export const actions = actionCreator(actionTypes);