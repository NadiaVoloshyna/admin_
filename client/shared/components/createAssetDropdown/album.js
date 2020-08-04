import React, { useState } from 'react';
import { func } from 'prop-types';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form as FinalForm } from 'react-final-form';
import CloudinaryUpload from 'shared/components/mediaLibrary/upload';
import { FormField } from 'shared/components/form';
import logger from 'utils/logger';
import { ASSET_TYPES } from './index';

const validation = values => {
  const errors = {};
  if (!values.author) {
    errors.author = 'Author is required';
  }
  if (!values.name) {
    errors.name = 'Album name is required';
  }
  if (!values.year) {
    errors.year = 'Tear of the album is required';
  }
  return errors;
};

const Album = ({ onSubmit, onDismiss }) => {
  const [image, setImage] = useState(false);

  const onImageUpload = (image) => {
    setImage(image);
  };

  const onImageUploadError = (error) => {
    logger.error(error);
  };

  const onSubmitForm = ({ author, name, year, description }) => {
    logger.log(author);
    if (!image) return;

    onSubmit({
      author,
      name,
      year,
      description,
      url: image.url,
      type: ASSET_TYPES.ALBUM
    });
  };

  return (
    <FinalForm
      onSubmit={onSubmitForm}
      validate={validation}
      render={({
        handleSubmit,
        submitting,
        pristine
      }) => {
        return (
          <Form
            className="clearfix needs-validation"
            onSubmit={handleSubmit}
            noValidate
          >
            <Card>
              <Card.Body>
                <Row>
                  <Col>
                    <Form.Group as={Row}>
                      <Form.Label column sm="2">Author</Form.Label>
                      <Col sm="10">
                        <FormField name="author" />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Form.Label column sm="2">Name</Form.Label>
                      <Col sm="10">
                        <FormField name="name" />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Form.Label column sm="2">Year</Form.Label>
                      <Col sm="10">
                        <FormField
                          name="year"
                          type="number"
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Form.Label column sm="2">Description</Form.Label>
                      <Col sm="10">
                        <FormField
                          name="description"
                          type="textarea"
                          rows={3}
                        />
                      </Col>
                    </Form.Group>
                  </Col>

                  <Col md="auto" className="text-center">
                    <CloudinaryUpload
                      width={247}
                      onSuccess={onImageUpload}
                      onError={onImageUploadError}
                    />

                    <ButtonGroup className="float-right mt-3">
                      <Button
                        variant="secondary"
                        onClick={() => onDismiss()}
                      >Discard</Button>
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={submitting || pristine}
                      >Save</Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Form>
        );
      }}
    />
  );
};

Album.propTypes = {
  onSubmit: func.isRequired,
  onDismiss: func.isRequired
};

export default Album;
