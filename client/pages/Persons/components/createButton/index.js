import React, { useState } from 'react';
import classnames from 'classnames';
import { func } from 'prop-types';
import Button from 'react-bootstrap/Button';
import Input from 'shared/components/input';

import styles from './index.module.scss';

const CreateButton = ({ onCreate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');

  const buttonText = isOpen
    ? 'Save'
    : 'Create Person';

  const buttonClasses = classnames(
    isOpen && styles.opened,
  );

  const onCreateClick = () => {
    if (isOpen && value) {
      onCreate(value);
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onClose = () => {
    setValue('');
    setIsOpen(false);
  };

  return (
    <div>
      <div className={styles.container}>
        { isOpen && (
          <Input
            placeholder="Person's Name"
            size="lg"
            className={styles.input}
            onChange={onChange}
            onBlur={onClose}
            autoFocus={isOpen}
            prepend={{
              icon: 'close',
              action: onClose,
            }}
          />
        )}
      </div>

      <Button
        variant="primary"
        className={buttonClasses}
        onClick={onCreateClick}
      >{ buttonText }</Button>
    </div>
  );
};

CreateButton.propTypes = {
  onCreate: func.isRequired,
};

export default CreateButton;
