import React from 'react';
import { shape, bool, func, string } from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';

const DuplicateModal = ({ show, onClose, duplicate }) => {
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
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" className="btn btn-primary">Open existing post</a>
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

DuplicateModal.propTypes = {
  show: bool,
  onClose: func.isRequired,
  duplicate: shape({
    id: string,
    name: string,
  }),
};

DuplicateModal.defaultProps = {
  show: false,
  duplicate: {},
};

export default DuplicateModal;
