import React from 'react';
import { bool, func, string, number } from 'prop-types';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import ElipsisToggle from 'shared/components/elipsisDropdownToggle';

const ProfessionSectionHeader = ({ name, idx, active, updateActive, onModalOpen, onRemove }) => {
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
          <Dropdown.Item onClick={() => { onRemove(idx); }}>
            Delete Section
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Card.Header>
  );
};

ProfessionSectionHeader.propTypes = {
  name: string.isRequired,
  idx: number.isRequired,
  active: bool,
  updateActive: func,
  onModalOpen: func,
  onRemove: func,
};

ProfessionSectionHeader.defaultProps = {
  active: false,
  updateActive: () => {},
  onModalOpen: () => {},
  onRemove: () => {},
};

export default ProfessionSectionHeader;
