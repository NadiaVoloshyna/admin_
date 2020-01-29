import React from 'react';
import _groupBy from 'lodash/groupBy';
import _upperFirst from 'lodash/upperFirst';
import _orderBy from 'lodash/orderBy';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend'
import AssetsGrid from '../assetsGrid';

const FileSystem = ({ assets, onSelect, onDelete, onMove, canDelete, isDragDrop }) => {
  assets = _groupBy(assets, (item) => item.type);

  return (
    <DndProvider backend={Backend}>
      { Object.keys(assets).map(key => (
        <div key={key}>
          <h5>{ _upperFirst(key.toLowerCase()) }</h5>
          <hr/>
          <AssetsGrid 
            assets={assets[key]}
            onSelect={onSelect}
            onDelete={onDelete}
            onMove={onMove}
            canDelete={canDelete}
            isDragDrop={isDragDrop}
          />
        </div>
      ))}
    </DndProvider>
  )
}

export default FileSystem;