import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';

const CreateDropdown = ({ onCreate, buttonText = 'Create', placeholder = '' }) => {
  const [value, setValue] = useState('');

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
            onCreate({value});
            setValue('');
          }}
        >Create</Button>
      </InputGroup.Append>
    </InputGroup>
  );

  return (
    <>
      <Dropdown focusFirstItemOnShow={false} >
        <Dropdown.Toggle>{ buttonText }</Dropdown.Toggle>
        <Dropdown.Menu className="w-100 p-2 bg-light">
          <Dropdown.Item as={InputControl} />
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export default CreateDropdown;