import React, { useState } from 'react';
import { func } from 'prop-types';
import dynamic from 'next/dynamic';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CloudinaryUpload from 'shared/components/mediaLibrary/upload';
import useErrorHandler from 'shared/hooks/useErrorHandler';
import { ERROR_MESSAGES } from 'shared/constants';
import { ASSET_TYPES } from './index';

// Force only client rendering
const AudioPlayer = dynamic(() => import('react-audio-player'), {
  ssr: false
});

const Audio = ({ onDismiss, onSubmit }) => {
  const handleError = useErrorHandler();
  const [value, setValue] = useState('');
  const [image, setImage] = useState(false);

  const onImageUpload = (image) => {
    setImage(image);
    setValue(image.original_filename);
  };

  const onImageUploadError = (error) => {
    handleError(error, ERROR_MESSAGES.ASSET_UPLOAD_IMAGE);
  };

  const onAssetAdd = () => {
    setValue('');
    onSubmit({
      name: value,
      url: image.url,
      type: ASSET_TYPES.IMAGE
    });
  };

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
              { !!image
                && (
                <AudioPlayer
                  src={image.url}
                  controls
                />
                )}

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
  );
};

Audio.propTypes = {
  onDismiss: func.isRequired,
  onSubmit: func.isRequired
};

export default Audio;
