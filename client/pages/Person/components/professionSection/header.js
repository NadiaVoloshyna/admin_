import React from 'react';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import ElipsisToggle from 'shared/components/elipsisDropdownToggle';

const ProfessionSectionHeader = ({ name, active, updateActive, onModalOpen }) => {
  return (
    <Card.Header>
      { name }
      {/* <Form.Check 
        type="switch"
        label="on"
        checked
        id={`${name}-switch`}
      /> */}

      <Dropdown className="float-right">
        <Dropdown.Toggle as={ElipsisToggle} variant="success" />

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => onModalOpen(true)}>
            Add Content
          </Dropdown.Item>
          <Dropdown.Item onClick={() => updateActive()}>
            { active ? 'Disable' : 'Enable' }
          </Dropdown.Item>
          <Dropdown.Item onClick={() => {}}>
            Delete Section
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Card.Header>
  )
}

export default ProfessionSectionHeader;
