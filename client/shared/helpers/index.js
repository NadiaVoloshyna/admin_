export const isRoot = (folder) => {
  return typeof folder.parent === 'undefined';
};

export const getActiveFolder = (breadcrumbs) => {
  return breadcrumbs[breadcrumbs.length - 1];
};

export const applyTransformations = (url, transformations) => {
  const parts = url.split('/');
  const name = parts.pop();
  const version = parts.pop();
  return `${parts.join('/')}/${transformations}/${version}/${name}`;
};

export const isOfType = (type) => ({
  isFolder: type === 'FOLDER',
  isImage:  type === 'IMAGE',
  isVideo:  type === 'VIDEO',
  isAlbum:  type === 'ALBUM',
});
