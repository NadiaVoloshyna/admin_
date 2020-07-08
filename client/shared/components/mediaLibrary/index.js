import React, { useState, useEffect } from 'react';
import api from 'shared/api/assets';
import { isOfType } from 'shared/helpers';
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
      // TODO: log and show error message
      console.error(response.statusText);
    }
  };

  const onMove = async (asset, parent) => {
    const response = await api.moveAsset(asset._id, parent._id);

    if (response.status === 200) {
      const newAssets = assets.filter(item => item._id !== asset._id);
      setAssets(newAssets);
      console.log('Moved successfully');
    } else {
      // TODO: log and show error message
      console.error(response.statusText);
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

export default MediaLibrary;
