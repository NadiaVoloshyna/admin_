import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';

const DuplicateModal = ({ show = false, onClose, duplicate = {} }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Duplicate post</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Post with {duplicate.name} name already exist. Please change the name of the person or edit existing post.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>I'll change the name</Button>
        
        <Link href={`/persons/${duplicate.id}`}>
          <a href="#" className="btn btn-primary">Open existing post</a>
        </Link>
      </Modal.Footer>
    </Modal>
  )
}

export default DuplicateModal;
