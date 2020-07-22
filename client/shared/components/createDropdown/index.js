import React, { useState } from 'react';
import { func, string } from 'prop-types';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';

const CreateDropdown = ({ onCreate, buttonText, placeholder }) => {
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const InputControl = () => (
    <InputGroup>
      <FormControl
        autoFocus
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <InputGroup.Append>
        <Button
          variant="primary"
          onClick={() => {
            onCreate({ value });
            setValue('');
            setIsOpen(false);
          }}
        >Create</Button>
      </InputGroup.Append>
    </InputGroup>
  );

  return (
    <>
      <Dropdown
        className="create-dropdown"
        show={isOpen}
        focusFirstItemOnShow={false}
        onToggle={(isOpen) => setIsOpen(isOpen)}
      >
        <Dropdown.Toggle className="create-dropdown-toggle">{ buttonText }</Dropdown.Toggle>
        <Dropdown.Menu className="w-100 p-2 bg-light">
          <Dropdown.Item as={InputControl} />
        </Dropdown.Menu>
      </Dropdown>

      <style global jsx>{`
        .create-dropdown {
          width: 100%;
        }

        .create-dropdown .dropdown-toggle:after {
          display: none;
        }
      `}</style>
    </>
  );
};

CreateDropdown.propTypes = {
  onCreate: func.isRequired,
  buttonText: string,
  placeholder: string
};

CreateDropdown.defaultProps = {
  buttonText: 'Create',
  placeholder: ''
};

export default CreateDropdown;
