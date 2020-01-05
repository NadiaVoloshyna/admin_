import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CloudinaryUpload from 'shared/components/mediaLibrary/upload';

const Image = ({ onToggle }) => {
  const [value, setValue] = useState('');
  const [image, setImage] = useState(false);

  const onImageUpload = (image) => {
    setImage(image);
    setValue(image.original_filename);
  }

  const onImageUploadError = (error) => {
    console.log(error);
  }

  return (
    <Card>
      <Row noGutters>
        <Col md="4" className="d-flex justify-content-center align-items-center">
          { !!image && <img src={image.url} className="mw-100 mh-100" /> }
          { !image && 
            <CloudinaryUpload 
              onSuccess={onImageUpload} 
              onError={onImageUploadError}
            />
          }
        </Col>
        <Col md="8">
          <Card.Body>
            <Form className="clearfix">
              <Form.Group>
                <Form.Control 
                  autoFocus 
                  placeholder="File name"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </Form.Group>
              
              <ButtonGroup className="float-right">
                <Button
                  variant="secondary"
                  onClick={() => onToggle(false)}
                >Discard</Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    setValue('');
                    onToggle(false, {
                      name: value,
                      url: image.url,
                      type: 'image'
                    });
                  }}
                >Add</Button>
              </ButtonGroup>
            </Form>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  )
};

export default Image;