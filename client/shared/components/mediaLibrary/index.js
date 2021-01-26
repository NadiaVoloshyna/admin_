import React, { useState, useEffect } from 'react';
import { func, shape, bool } from 'prop-types';
import api from 'shared/api/assets';
import { isOfType } from 'shared/helpers';
import { AssetType } from 'shared/prop-types';
import useErrorHandler from 'shared/hooks/useErrorHandler';
import { ERROR_MESSAGES } from 'shared/constants';
import Breadcrumbs from './breadcrumbs';
import FileSystem from './fileSystem';
import UploadBox from './uploadBox';
import ActionsPanel from './actionsPanel';

const MediaLibrary = ({ onAssetSelect, newAsset, canDelete, isDragDrop, isUploadBoxOpen, root }) => {
  const handleError = useErrorHandler();
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
    try {
      await api.deleteAsset(asset._id);
      const newAssets = assets.filter(item => item._id !== asset._id);
      setAssets(newAssets);
    } catch (error) {
      handleError(error, ERROR_MESSAGES.LIBRARY_FILE_DELETE);
    }
  };

  const onMove = async (asset, parent) => {
    try {
      await api.moveAsset(asset._id, parent._id);
      const newAssets = assets.filter(item => item._id !== asset._id);
      setAssets(newAssets);
    } catch (error) {
      handleError(error, ERROR_MESSAGES.LIBRARY_FILE_MOVE);
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
  root: shape(AssetType),
};

MediaLibrary.defaultProps = {
  onAssetSelect: () => {},
  newAsset: null,
  canDelete: false,
  isDragDrop: false,
  isUploadBoxOpen: false,
  root: undefined,
};

export default MediaLibrary;
