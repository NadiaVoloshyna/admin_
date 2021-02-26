import React from 'react';
import { arrayOf, func, bool, shape } from 'prop-types';
import Row from 'react-bootstrap/Row';
import _groupBy from 'lodash/groupBy';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import AssetsGrid from '../assetsGrid';
import { AssetType } from '../../../prop-types';

const FileSystem = ({ assets, onSelect, onDelete, onMove, canDelete, isDragDrop }) => {
  assets = _groupBy(assets, (item) => item.type);

  return (
    <DndProvider backend={Backend}>
      <Row>
        { Object.keys(assets).map(key => (
          <AssetsGrid
            key={key}
            assets={assets[key]}
            onSelect={onSelect}
            onDelete={onDelete}
            onMove={onMove}
            canDelete={canDelete}
            isDragDrop={isDragDrop}
          />
        ))}
      </Row>
    </DndProvider>
  );
};

FileSystem.propTypes = {
  assets: arrayOf(shape(AssetType)).isRequired,
  onSelect: func,
  onDelete: func,
  onMove: func,
  canDelete: bool,
  isDragDrop: bool,
};

FileSystem.defaultProps = {
  onSelect: () => {},
  onDelete: () => {},
  onMove: () => {},
  canDelete: false,
  isDragDrop: false,
};

export default FileSystem;
