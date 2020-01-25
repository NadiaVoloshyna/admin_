import React, { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';

const CustomToggle = forwardRef(({ onClick }, ref) => (
  <>
    <div 
      className="toggle px-2 rounded"
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <FontAwesomeIcon icon='ellipsis-v' />
    </div>
    <style jsx>{`
      .toggle {
        cursor: pointer;
        color: var(--gray);
        //background: var(--gray);
      }

      .toggle:hover {
        opacity: .5;
        background: var(--gray);
        color: var(--light);
      }
    `}</style>
  </>
));

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
        <Dropdown.Toggle as={CustomToggle} variant="success" />

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
