import React from 'react';
import _groupBy from 'lodash/groupBy';
import _upperFirst from 'lodash/upperFirst';
import _orderBy from 'lodash/orderBy';
import AssetsGrid from '../assetsGrid';

const FileSystem = ({ assets, onSelect, onDelete, canDelete }) => {
  assets = _groupBy(assets, (item) => item.type);

  return (
    <>
      { Object.keys(assets).map(key => (
        <>
          <h5>{ _upperFirst(key.toLowerCase()) }</h5>
          <hr/>
          <AssetsGrid 
            assets={assets[key]}
            onSelect={onSelect}
            onDelete={onDelete}
            canDelete={canDelete}
          />
        </>
      ))}
    </>
  )
}

export default FileSystem;