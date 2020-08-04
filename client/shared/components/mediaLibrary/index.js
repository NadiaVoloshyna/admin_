import React, { useState, useEffect } from 'react';
import { func, shape, bool } from 'prop-types';
import api from 'shared/api/assets';
import { isOfType } from 'shared/helpers';
import { AssetType } from 'shared/prop-types';
import logger from 'utils/logger';
import Breadcrumbs from './breadcrumbs';
import FileSystem from './fileSystem';
import UploadBox from './uploadBox';
import ActionsPanel from './actionsPanel';

const MediaLibrary = ({ onAssetSelect, newAsset, canDelete, isDragDrop, isUploadBoxOpen, root }) => {
  const [ currentFolder, setCurrentFolder ] = useState(null);
  const [ assets, setAssets ] = useState([]);

  const getAssets = async (id) => {
    const { data: assets } = await api.getAssets(id);

    setAssets(assets);
  };

  useEffect(() => {
    getAssets(root ? root._id : null);
  }, []);

  useEffect(() => {
    if (newAsset) {
      setAssets([...assets, newAsset]);
    }
  }, [newAsset]);

  const onSelect = (asset) => {
    const { isFolder } = isOfType(asset.type);

    if (isFolder) {
      getAssets(asset._id);
      setCurrentFolder(asset);
    }

    onAssetSelect(asset);
  };

  const onDelete = async (asset) => {
    const response = await api.deleteAsset(asset._id);

    if (response.status === 200) {
      const newAssets = assets.filter(item => item._id !== asset._id);
      setAssets(newAssets);
    } else {
      logger.log(response.statusText);
    }
  };

  const onMove = async (asset, parent) => {
    const response = await api.moveAsset(asset._id, parent._id);

    if (response.status === 200) {
      const newAssets = assets.filter(item => item._id !== asset._id);
      setAssets(newAssets);
      logger.log('Moved successfully');
    } else {
      logger.log(response.statusText);
    }
  };

  return (
    <>
      <UploadBox open={isUploadBoxOpen} />

      <Breadcrumbs
        currentFolder={currentFolder}
        onCrumbClick={onSelect}
        root={root}
      />

      <ActionsPanel />

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
  onAssetSelect: func,
  newAsset: shape(AssetType),
  canDelete: bool,
  isDragDrop: bool,
  isUploadBoxOpen: bool,
  root: shape(AssetType)
};

MediaLibrary.defaultProps = {
  onAssetSelect: () => {},
  newAsset: null,
  canDelete: false,
  isDragDrop: false,
  isUploadBoxOpen: false,
  root: null
};

export default MediaLibrary;
