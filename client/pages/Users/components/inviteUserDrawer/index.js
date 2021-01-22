import React, { useState } from 'react';
import { func, bool } from 'prop-types';
import Button from 'react-bootstrap/Button';
import BootstrapForm from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import { Form, Field } from 'react-final-form';
import Drawer from 'shared/components/drawer';
import { USER_ROLES } from 'common/constants';

const roles = Object.values(USER_ROLES).filter(item => item !== USER_ROLES.SUPER);

const InviteUserDrawer = ({ onApply, canInviteAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  let submitHandler;

  if (!canInviteAdmin) return null;

  const onInvitationSend = (values) => {
    onApply(values);
    setIsOpen(false);
  };

  return (
    <div className="d-flex align-items-center">
      <Button
        variant="primary"
        onClick={() => setIsOpen(true)}
      >Invite User</Button>

      <Drawer open={isOpen} onClose={setIsOpen}>
        <Drawer.Header>
          Invite User
        </Drawer.Header>

        <Drawer.Body>
          <Form
            onSubmit={onInvitationSend}
            render={({ handleSubmit }) => {
              submitHandler = handleSubmit;

              return (
                <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                  <Field
                    name="email"
                    component="input"
                    type="email"
                    placeholder="Email"
                    className="form-control"
                  />

                  <p className="mt-4">Select the role</p>

                  <ListGroup>
                    { roles.map((item) => {
                      return (
                        <ListGroup.Item key={`roles_${item}`}>
                          <Field
                            name="role"
                            type="radio"
                            value={item}
                            id={`roles_${item}`}
                          >
                            {props => (
                              // eslint-disable-next-line react/prop-types
                              <BootstrapForm.Check {...props.input} label={item} />
                            )}
                          </Field>
                        </ListGroup.Item>
                      );
                    }) }
                  </ListGroup>
                </form>
              );
            }}
          />
        </Drawer.Body>

        <Drawer.Footer>
          <Button
            type="button"
            block
            onClick={(event) => submitHandler(event)}
          >
            Send Invitation
          </Button>
        </Drawer.Footer>
      </Drawer>
    </div>
  );
};

InviteUserDrawer.propTypes = {
  onApply: func.isRequired,
  canInviteAdmin: bool.isRequired,
};

export default InviteUserDrawer;
