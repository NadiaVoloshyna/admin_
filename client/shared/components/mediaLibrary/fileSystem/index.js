import React from 'react';
import _partition from 'lodash/partition';
import _flatten from 'lodash/flatten';
import Asset from '../asset';

const FileSystem = ({ assets, onSelect, onDelete, canDelete }) => {
  assets = _flatten(_partition(assets, (item) => item.type === 'folder'));

  return (
    <>
      <div className="d-flex flex-wrap">
        { assets.map(item => (
          <div key={item._id} className="asset-wrapper">
            <Asset 
              item={item}
              onSelect={onSelect}
              onDelete={onDelete}
              canDelete={canDelete}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default FileSystem;