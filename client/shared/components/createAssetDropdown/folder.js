import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

const Folder = ({ onToggle }) => {
  const [value, setValue] = useState('');

  return (
    <InputGroup>
      <FormControl 
        autoFocus 
        placeholder="Folder's name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <InputGroup.Append>
        <Button 
          variant="primary"
          onClick={() => {
            setValue('');
            onToggle(false, {
              name: value,
              type: 'folder'
            });
          }}
        >Create</Button>
      </InputGroup.Append>
    </InputGroup>
  )
};

export default Folder;