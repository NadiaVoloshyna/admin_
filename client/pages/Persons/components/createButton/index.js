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
    // When we click `save` button input looses focus to quickly
    // thus there is not time to use the value to create new person
    setTimeout(() => {
      setValue('');
      setIsOpen(false);
    }, 200);
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
        size="lg"
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
