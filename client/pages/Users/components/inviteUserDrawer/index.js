import React, { useState } from 'react';
import { func, bool } from 'prop-types';
import Button from 'react-bootstrap/Button';
import BootstrapForm from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import { useForm } from 'react-hook-form';
import Drawer from 'shared/components/drawer';
import { USER_ROLES, PATTERNS } from 'common/constants';

const roles = Object.values(USER_ROLES).filter(item => item !== USER_ROLES.SUPER);

const InviteUserDrawer = ({ onApply, canInviteAdmin }) => {
  const { register, formState: { errors, isSubmitted, isSubmitSuccessful }, handleSubmit, reset } = useForm();
  const [isOpen, setIsOpen] = useState(false);

  const wasValidated = isSubmitted && !isSubmitSuccessful;

  if (!canInviteAdmin) return null;

  const onClose = () => {
    setIsOpen(false);
    reset();
  };

  const onInvitationSend = (values) => {
    onApply(values);
    onClose();
  };

  return (
    <div className="d-flex align-items-center">
      <Button
        variant="primary"
        size="lg"
        onClick={() => setIsOpen(true)}
      >Запросити користувача</Button>

      <Drawer open={isOpen} onClose={onClose}>
        <Drawer.Header>
          Запросити користувача
        </Drawer.Header>

        <Drawer.Body>
          <form className={`needs-validation ${wasValidated && 'was-validated'}`} noValidate>
            <BootstrapForm.Group>
              <input
                name="email"
                type="email"
                placeholder="Електронна адреса"
                className="form-control"
                required
                {...register('email', {
                  required: true,
                  pattern: PATTERNS.EMAIL,
                })}
              />
              {errors.email && <span className="invalid-feedback">Електронна адреса є обов'язковою</span>}
            </BootstrapForm.Group>

            <p>Виберіть роль</p>

            <ListGroup>
              { roles.map((item) => {
                return (
                  <ListGroup.Item key={`roles_${item}`}>
                    <div className="custom-radio">
                      <input
                        name="role"
                        type="radio"
                        id={`roles_${item}`}
                        value={item}
                        required
                        {...register('role', { required: true })}
                      />
                      <label htmlFor={`roles_${item}`}>{ item }</label>
                    </div>
                  </ListGroup.Item>
                );
              }) }
            </ListGroup>
            {errors.role && <span className="invalid-feedback d-block">Роль є обов'язковою</span>}
          </form>
        </Drawer.Body>

        <Drawer.Footer>
          <Button
            type="button"
            block
            onClick={handleSubmit(onInvitationSend)}
          >
            Надіслати запрошення
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
