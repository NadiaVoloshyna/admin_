import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CloudinaryUpload from 'shared/components/mediaLibrary/upload';
import ReactAudioPlayer from 'react-audio-player';
import { ASSET_TYPES } from './index';

const Audio = ({ onDismiss, onSubmit }) => {
  const [value, setValue] = useState('');
  const [image, setImage] = useState(false);

  const onImageUpload = (image) => {
    setImage(image);
    setValue(image.original_filename);
  }

  const onImageUploadError = (error) => {
    console.log(error);
  }

  const onAssetAdd = () => {
    setValue('');
    onSubmit({
      name: value,
      url: image.url,
      type: ASSET_TYPES.IMAGE
    });
  }

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col>
            <Form className="clearfix">
              <Form.Group>
                <Form.Control 
                  autoFocus 
                  placeholder="File name"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </Form.Group>

              { !!image &&
                <ReactAudioPlayer
                  src={image.url}
                  controls
                />
              }
              
              <ButtonGroup className="float-right">
                <Button
                  variant="secondary"
                  onClick={() => onDismiss()}
                >Discard</Button>
                <Button
                  variant="primary"
                  onClick={onAssetAdd}
                >Add</Button>
              </ButtonGroup>
            </Form>
          </Col>

          <Col md="auto" className="text-center">
            <CloudinaryUpload
              width={240}
              onSuccess={onImageUpload} 
              onError={onImageUploadError}
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
};

export default Audio;