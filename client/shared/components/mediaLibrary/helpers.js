import { ASSETS_CONFIG } from './constants';

export const isRoot = (folder) => {
  return typeof folder.parent === 'undefined';
}

export const getActiveFolder = (breadcrumbs) => {
  return breadcrumbs[breadcrumbs.length - 1];
};

export const applyTransformations = (url, transformations) => {
  const parts = url.split('/');
  const name = parts.pop();
  const version = parts.pop();
  return `${parts.join('/')}/${transformations}/${version}/${name}`;
}

export const isOfType = (type) => ({
  isFolder: type === 'FOLDER',
  isImage:  type === 'IMAGE',
  isVideo:  type === 'VIDEO',
  isAlbum:  type === 'ALBUM'
})

export const constructBreadcrumbs = (path) => {
  path = path ? path.split('/') : [];
  return ['Root', ...path];
}

export const applyBreadcrumbs = (breadcrumbs, folder) => {
  let crumbs = breadcrumbs;

  if (folder.name !== 'Root') {
    const index = crumbs.findIndex(item => item._id === folder._id);

    if (index === -1) {
      crumbs.push(folder);
    } else {
      crumbs = crumbs.splice(0, index + 1);
    }
  } else {
    crumbs = [];
  }

  return crumbs;
}

export const getAssetMetadata = (type) => {
  return ASSETS_CONFIG[type];
}