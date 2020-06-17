import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';

const ShouldDeletePersonsModal = ({ show, persons = [], onConfirm, onDiscard }) => {
  return (
    <Modal show={show} onHide={onDiscard}>
      <Modal.Header closeButton>
        <Modal.Title>Delete persons</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Alert variant="danger">
          Warning! You are about to delete person posts in the list below.
          Be aware that by deleting these posts all media assets under corresponding media folders will be deleted too.
          Also, the corresponding google drive document will be deleted.
        </Alert>

        <ListGroup>
          { persons.map(item => (
            <ListGroup.Item key={item._id}>{ item.name }</ListGroup.Item>
          )) }
        </ListGroup>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onDiscard}>I changed my mind</Button>
        <Button variant="danger" onClick={onConfirm}>I know what I'm doing</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShouldDeletePersonsModal;
