import React, { useState } from 'react';
import { arrayOf, object, func, bool } from 'prop-types';
import CreatableSelect from 'react-select/creatable';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Drawer from 'shared/components/drawer';
import { getResources } from '../../utils';

const AddPermissionDrawer = (props) => {
  const {
    permissions,
    isOpen,
    setIsOpen,
    onAdd,
  } = props;

  const [resource, setResource] = useState(null);
  const [action, setAction] = useState(null);

  const resources = getResources(permissions);

  const onResourseSelect = (newValue) => {
    setResource(newValue.value);
  };

  const onActionSelect = (event) => {
    setAction(event.target.value);
  };

  const onPermissionAdd = () => {
    onAdd({ resource, action });
  };

  return (
    <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
      <Drawer.Header>
        Add permission
      </Drawer.Header>
      <Drawer.Body>
        <Form.Group>
          <Form.Label>Choose or enter new resource</Form.Label>
          <CreatableSelect
            isClearable
            onChange={onResourseSelect}
            options={resources}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Enter new permision</Form.Label>
          <Form.Control
            className="mb-2 mr-sm-2"
            onChange={onActionSelect}
          />
        </Form.Group>
      </Drawer.Body>
      <Drawer.Footer>
        <Button
          type="button"
          block
          onClick={onPermissionAdd}
        >
          Add
        </Button>
      </Drawer.Footer>
    </Drawer>
  );
};

AddPermissionDrawer.propTypes = {
  permissions: arrayOf(object).isRequired,
  isOpen: bool,
  setIsOpen: func.isRequired,
  onAdd: func.isRequired,
};

AddPermissionDrawer.defaultProps = {
  isOpen: false,
};

export default AddPermissionDrawer;
