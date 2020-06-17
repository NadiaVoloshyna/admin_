import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { Form, Field } from 'react-final-form'

const InviteUserModal = (props) => {
  const { canInviteAdmin, onClose, show, inviteUser } = props;

  const onSubmit = ({ email, role }) => {
    inviteUser({email, role})
  
    onClose && onClose();
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Invite user.</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form
          onSubmit={(values) => onSubmit(values)}
          render={({ handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Email</label>
                  <div className="col-sm-10">
                    <Field
                      name="email"
                      component="input"
                      type="email"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Role</label>
                  <div className="col-sm-10">
                    <Field 
                      className="form-control" 
                      name="role"
                      component="select"
                    >
                      <option selected>Select user's role</option>
                      { canInviteAdmin && <option value="admin">Admin</option> }
                      <option value="author">Author</option>
                      <option value="reviewer">Reviewer</option>
                    </Field>
                  </div>
                </div>
                
                <ButtonToolbar className="justify-content-end">
                  <ButtonGroup>
                    <Button variant="secondary" onClick={onClose}>Discard</Button>
                    <Button variant="primary" type="submit">Send Invite</Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </form>
          )}}
        />
      </Modal.Body>
    </Modal>
  )
}

export default InviteUserModal;
