import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Asset from '../asset';

const AssetsGrid = ({ assets, onSelect, onDelete, onMove, canDelete = false, isDragDrop }) => {
  return (
    <Row>
      { assets.map(item => (
        <Col 
          sm={6}
          md={4}
          lg={3}
          xl={2}
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
        </Col>
      ))}
    </Row>
  )
}

export default AssetsGrid;