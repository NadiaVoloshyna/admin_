import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Album = ({ onToggle }) => {
  return (
    <Card>
      <Row noGutters>
        <Col md="4" className="d-flex justify-content-center align-items-center">

        </Col>
        <Col>
          <Card.Body>
            <Form className="clearfix">
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  className="mb-3"
                  autoFocus
                />

                <Form.Label>Year</Form.Label>
                <Form.Control 
                  className="mb-3"
                />

                <Form.Label>Description</Form.Label>
                <Form.Control 
                className="mb-3"
                  as="textarea" 
                  rows="3" 
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

export default Album;