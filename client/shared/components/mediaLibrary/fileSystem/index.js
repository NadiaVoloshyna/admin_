import React from 'react';
import _groupBy from 'lodash/groupBy';
import _upperFirst from 'lodash/upperFirst';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Asset from '../asset';

const FileSystem = ({ assets, onSelect, onDelete, canDelete }) => {
  assets = _groupBy(assets, (item) => item.type);

  return (
    <>
      { Object.keys(assets).map(key => (
        <>
          <h5>{ _upperFirst(key.toLowerCase()) }</h5>
          <hr/>
          <Row>
            { assets[key].map(item => (
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
        </>
      ))}
    </>
  )
}

export default FileSystem;