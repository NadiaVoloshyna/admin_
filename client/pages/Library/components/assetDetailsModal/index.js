import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const AssetDetailsModal = ({ show, item, setShow }) => {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      size="lg"
    >
      <Modal.Body>
        <Container>
          <Row>
            <Col md={4}>
              <img
                src={item.url}
                alt={item.name}
                className="img-thumbnail"
              />
            </Col>
            <Col md={8}>
              <h6 className="text-wrap">{item.name}</h6>
              <ul className="list-unstyled">
                <li>{item.createdBy}</li>
                <li>{item.created}</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default AssetDetailsModal;
