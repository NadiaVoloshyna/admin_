import React, { useState } from 'react';
import { func, bool } from 'prop-types';
import Button from 'react-bootstrap/Button';
import BootstrapForm from 'react-bootstrap/Form';
import { Form, Field } from 'react-final-form';
import Drawer from 'shared/components/drawer';

const CreateProfessionDrawer = ({ onApply, canCreate }) => {
  const [isOpen, setIsOpen] = useState(false);
  let submitHandler;

  if (!canCreate) return null;

  const onInvitationSend = (values) => {
    onApply(values);
    setIsOpen(false);
  };

  return (
    <div className="d-flex align-items-center">
      <Button
        variant="primary"
        size="lg"
        onClick={() => setIsOpen(true)}
      >Create Profession</Button>

      <Drawer open={isOpen} onClose={setIsOpen}>
        <Drawer.Header>Create Profession</Drawer.Header>

        <Drawer.Body>
          <Form
            onSubmit={onInvitationSend}
            render={({ handleSubmit }) => {
              submitHandler = handleSubmit;

              return (
                <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                  <BootstrapForm.Group>
                    <Field
                      name="name"
                      component="input"
                      type="text"
                      placeholder="Title"
                      className="form-control"
                    />
                  </BootstrapForm.Group>

                  <BootstrapForm.Group>
                    <Field
                      name="description"
                      component="textarea"
                      rows={9}
                      placeholder="Description"
                      className="form-control"
                    />
                  </BootstrapForm.Group>
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
            Create
          </Button>
        </Drawer.Footer>
      </Drawer>
    </div>
  );
};

CreateProfessionDrawer.propTypes = {
  onApply: func.isRequired,
  canCreate: bool.isRequired,
};

export default CreateProfessionDrawer;
