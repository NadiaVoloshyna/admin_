import { actionTypes } from './actions';
import _random from 'lodash/random';

export const initialState = {
  pageConfig: {},
  breadcrumbs: [],
  media: []
}

const addImage = (state, { parent, name, url }, user) => {
  const media = state.media;

  media.push({
    id: _random(9999),
    parent,
    name,
    url,
    type: 'image',
    createdBy: user.name
  });

  return {
    ...state,
    media
  }
}

const applyBreadcrumbs = (state, folder) => {
  let breadcrumbs = state.breadcrumbs;

  if (folder.name !== 'Root') {
    const index = breadcrumbs.findIndex(item => item._id === folder._id);

    if (index === -1) {
      breadcrumbs.push(folder);
    } else {
      breadcrumbs = breadcrumbs.splice(0, index + 1);
    }
  } else {
    breadcrumbs = [];
  }

  return {
    ...state,
    breadcrumbs
  }
}

const deleteAsset = (state, id) => {
  let media = state.media;
  const index = media.findIndex(item => item._id === id);

  // Remove asset
  media.splice(index, 1);

  return {
    ...state,
    media
  }
}

const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case actionTypes.LIBRARY_INITIAL_STATE:
      return payload;

    case actionTypes.GET_ASSETS_SUCCESS:
      return {
        ...state,
        media: payload
      }

    case actionTypes.CREATE_ASSET_SUCCESS:
      return {
        ...state,
        media: [...state.media, payload]
      }

    case actionTypes.CREATE_IMAGE:
      return addImage(state, payload, shared.user);

    case actionTypes.DELETE_ASSET_SUCCESS:
      return deleteAsset(state, payload);

    case actionTypes.APPLY_BREADCRUMBS:
      return applyBreadcrumbs(state, payload);

    default:
      return state
  }
}

export default reducer;