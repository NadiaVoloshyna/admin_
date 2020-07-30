import React from 'react';
import { arrayOf, func, bool, shape } from 'prop-types';
import Asset from '../asset';
import { AssetType } from '../../../prop-types';

const AssetsGrid = ({ assets, onSelect, onDelete, onMove, canDelete, isDragDrop }) => {
  return (
    <div className="asset-grid">
      { assets.map(item => (
        <div
          key={item._id}
          className="asset-wrapper"
        >
          <Asset
            item={item}
            onSelect={onSelect}
            onDelete={onDelete}
            onMove={onMove}
            canDelete={canDelete}
            isDragDrop={isDragDrop}
          />
        </div>
      ))}

      <style global jsx>{`
        .asset-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          width: 100%;
        }

        .asset-wrapper {
          padding: 0 10px 20px;
        }
      `}</style>
    </div>
  );
};

AssetsGrid.propTypes = {
  assets: arrayOf(shape(AssetType)).isRequired,
  onSelect: func,
  onDelete: func,
  onMove: func,
  canDelete: bool,
  isDragDrop: bool
};

AssetsGrid.defaultProps = {
  onSelect: () => {},
  onDelete: () => {},
  onMove: () => {},
  canDelete: false,
  isDragDrop: false
};

export default AssetsGrid;
