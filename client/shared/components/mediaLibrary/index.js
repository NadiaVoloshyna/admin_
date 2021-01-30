import React from 'react';
import { func, shape, bool, arrayOf, string } from 'prop-types';
import { AssetType } from 'shared/prop-types';
import Breadcrumbs from './breadcrumbs';
import FileSystem from './fileSystem';

const MediaLibrary = (props) => {
  const {
    assets,
    breadcrumbs,
    onSelect,
    onDelete,
    onMove,
    canDelete,
    isDragDrop,
    root,
  } = props;

  return (
    <>
      <Breadcrumbs
        breadcrumbs={breadcrumbs}
        root={root}
      />

      <FileSystem
        assets={assets}
        onSelect={onSelect}
        onDelete={onDelete}
        onMove={onMove}
        canDelete={canDelete}
        isDragDrop={isDragDrop}
      />
    </>
  );
};

MediaLibrary.propTypes = {
  assets: arrayOf(shape(AssetType)).isRequired,
  breadcrumbs: arrayOf(shape({
    _id: string,
    name: string,
  })).isRequired,
  onSelect: func,
  onMove: func,
  onDelete: func,
  canDelete: bool,
  isDragDrop: bool,
  root: shape(AssetType),
};

MediaLibrary.defaultProps = {
  onSelect: () => {},
  onMove: () => {},
  onDelete: () => {},
  canDelete: false,
  isDragDrop: false,
  root: undefined,
};

export default MediaLibrary;
