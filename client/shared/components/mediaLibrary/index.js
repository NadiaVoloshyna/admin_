import React, { useState, useEffect } from 'react';
import _remove from 'lodash/remove';
import Breadcrumbs from './breadcrumbs';
import FileSystem from './fileSystem';
import api from 'shared/api/assets';
import { isOfType } from 'shared/helpers';

const MediaLibrary = ({ onAssetSelect, newAsset, canDelete, root }) => {
  const [ currentFolder, setCurrentFolder ] = useState(null);
  const [ assets, setAssets ] = useState([]);

  const getAssets = async (id) => {
    const response = await api.getAssets(id);
    const assets = await response.json();
    
    setAssets(assets);
  }

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
  }

  const onDelete = async (asset) => {
    const response = await api.deleteAsset(asset._id);

    if (response.status === 200) {
      const newAssets = assets.filter(item => item._id !== asset._id);
      setAssets(newAssets);
    } else {
      // TODO: log and show error message
      console.error(response.statusText);
    }
  }

  return (
    <>
      <Breadcrumbs 
        currentFolder={currentFolder}
        onCrumbClick={onSelect}
        root={root}
      />
      <FileSystem 
        assets={assets}
        onSelect={onSelect}
        onDelete={onDelete}
        canDelete={canDelete}
      />
    </>
  );
}

export default MediaLibrary;