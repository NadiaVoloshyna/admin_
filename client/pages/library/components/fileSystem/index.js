import React, { useState } from 'react';
import Asset from 'pages/library/components/asset';
import AssetDetailsModal from 'pages/library/components/assetDetailsModal';

const FileSystem = ({ assets }) => {
  const [show, setShow] = useState(false);
  const [selectedAsset, setSelected] = useState();
  
  const folders = assets.filter(item => item.type === 'folder');
  const nonFolders = assets.filter(item => item.type !== 'folder');

  const onItemSelect = (item) => {
    setSelected(item);
    setShow(true);
  }

  return (
    <>
      <div className="d-flex flex-wrap">
        { folders.map(item => (
          <div key={item._id}  className="asset-wrapper">
            <Asset item={item} />
          </div>
        ))}
      </div>
      <div className="d-flex flex-wrap">
        { nonFolders.map(item => (
          <div key={item._id} className="asset-wrapper">
            <Asset item={item} onClick={() => onItemSelect(item)}/>
          </div>
        ))}
      </div>

      { !!selectedAsset && 
        <AssetDetailsModal 
          item={selectedAsset}
          show={show}
          setShow={setShow}
        />
      }
    </>
  )
}

export default FileSystem;