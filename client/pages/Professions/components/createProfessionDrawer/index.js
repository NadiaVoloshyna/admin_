import React, { useState } from 'react';
import { func, bool } from 'prop-types';
import Button from 'react-bootstrap/Button';
import BootstrapForm from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import Drawer from 'shared/components/drawer';

const CreateProfessionDrawer = ({ onApply, canCreate }) => {
  const { register, formState: { errors, isSubmitted, isValid }, handleSubmit } = useForm();
  const [isOpen, setIsOpen] = useState(false);

  const wasValidated = isSubmitted && !isValid;

  if (!canCreate) return null;

  const onCreate = (values) => {
    onApply(values);
    setIsOpen(false);
  };

  return (
    <div className="d-flex align-items-center">
      <Button
        variant="primary"
        size="lg"
        onClick={() => setIsOpen(true)}
      >Створити професію</Button>

      <Drawer open={isOpen} onClose={setIsOpen}>
        <Drawer.Header>Створити професію</Drawer.Header>

        <Drawer.Body>
          <form className={`needs-validation ${wasValidated && 'was-validated'}`} noValidate>
            <BootstrapForm.Group>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Назва"
                required
                {...register('name', { required: true })}
              />
              {errors.name && <span className="invalid-feedback">Назва професії є обов'язковою</span>}
            </BootstrapForm.Group>

            <BootstrapForm.Group>
              <textarea
                name="description"
                className="form-control"
                placeholder="Опис"
                rows={9}
                {...register('description')}
              />
            </BootstrapForm.Group>
          </form>
        </Drawer.Body>

        <Drawer.Footer>
          <Button
            type="submit"
            onClick={handleSubmit(onCreate)}
            block
          >
            Створити
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
