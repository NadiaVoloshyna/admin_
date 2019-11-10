import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { actionTypes, actionCreator } from 'actions/person';

const DuplicateModal = () => {
  const { showDuplicatePersonModal, duplicate } = useSelector(state => state.person);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(actionCreator(actionTypes.SHOW_DUPLICATE_PERSON_MODAL, false));

  return (
    <Modal show={showDuplicatePersonModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Duplicate post</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Post with {duplicate.name} name already exist. Please change the name of the person or edit existing post.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>I'll change the name</Button>
        
        <Link href={`/persons/${duplicate.id}`}>
          <a href="#" className="btn btn-primary">Open existing post</a>
        </Link>
      </Modal.Footer>
    </Modal>
  )
}

export default DuplicateModal;
