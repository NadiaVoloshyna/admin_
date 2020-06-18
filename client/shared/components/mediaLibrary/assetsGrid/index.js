import React from 'react';
import Asset from '../asset';

const AssetsGrid = ({ assets, onSelect, onDelete, onMove, canDelete = false, isDragDrop }) => {
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

export default AssetsGrid;
