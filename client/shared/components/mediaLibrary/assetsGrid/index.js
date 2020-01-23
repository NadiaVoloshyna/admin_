import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Asset from '../asset';

const AssetsGrid = ({ assets, onSelect, onDelete, canDelete = false }) => {
  return (
    <Row>
      { assets.map(item => (
        <Col 
          sm={6}
          md={4}
          lg={4}
          xl={3}
          key={item._id} 
          className="asset-wrapper"
        >
          <Asset 
            item={item}
            onSelect={onSelect}
            onDelete={onDelete}
            canDelete={canDelete}
          />
        </Col>
      ))}
    </Row>
  )
}

export default AssetsGrid;