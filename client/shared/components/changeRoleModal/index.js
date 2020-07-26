import React from 'react';
import { bool, func, string, oneOf } from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UsersApi from 'shared/api/users';
import { Form, Field } from 'react-final-form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { USER_ROLES } from 'common/constants';
import _upperFirst from 'lodash/upperFirst';

const ChangeRoleModal = ({ show, toggleShow, userId, userRole }) => {
  const onSubmit = ({ role }) => {
    if (!Object.values(USER_ROLES).includes(role)) return;

    UsersApi.changeRole(userId, role)
      .then(() => window.location.replace('/auth/logout'))
      .catch((error) => console.error(error));

    toggleShow();
  };

  const roles = Object.values(USER_ROLES).filter(item => item !== userRole && item !== 'super');

  return (
    <Modal
      show={show}
      onHide={toggleShow}
    >
      <Modal.Header>
        Change user's role
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="form-group">
                  <Field
                    className="form-control"
                    name="role"
                    component="select"
                  >
                    <option selected>select a role</option>
                    { roles.map(item => <option value={item} key={item}>{ _upperFirst(item) }</option>) }
                  </Field>
                </div>

                <ButtonToolbar className="justify-content-end">
                  <ButtonGroup>
                    <Button variant="secondary" onClick={toggleShow}>Discard</Button>
                    <Button
                      variant="primary"
                      type="submit"
                    >Submit</Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </form>
            );
          }}
        />
      </Modal.Body>
    </Modal>
  );
};

ChangeRoleModal.propTypes = {
  show: bool.isRequired,
  toggleShow: func.isRequired,
  userId: string.isRequired,
  userRole: oneOf(Object.values(USER_ROLES)).isRequired
};

export default ChangeRoleModal;
