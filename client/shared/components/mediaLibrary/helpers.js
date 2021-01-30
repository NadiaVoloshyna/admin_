import { ASSETS_CONFIG } from './constants';

export const isRoot = (folder) => {
  return typeof folder.parent === 'undefined';
};

export const getActiveFolder = (breadcrumbs) => {
  return breadcrumbs[breadcrumbs.length - 1];
};

export const isOfType = (type) => ({
  isFolder: type === 'FOLDER',
  isImage:  type === 'IMAGE',
  isVideo:  type === 'VIDEO',
  isAlbum:  type === 'ALBUM',
});

export const getAssetMetadata = (type) => {
  return ASSETS_CONFIG[type];
};
