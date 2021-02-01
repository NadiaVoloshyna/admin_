import React, { useState } from 'react';
import { arrayOf, object, func, bool, shape } from 'prop-types';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Drawer from 'shared/components/drawer';
import { getResources, getRoles, getActions } from '../../utils';

const AddAttributesDrawer = (props) => {
  const {
    permissions,
    permissionToEdit,
    isOpen,
    setIsOpen,
    onUpdate,
  } = props;

  const [selectedResource, setSelectedResource] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [actions, setActions] = useState(null);
  const [attributes, setAttributes] = useState([]);

  const isInEdit = Object.keys(permissionToEdit).length;
  const resources = getResources(permissions);

  const createValue = (attr) => {
    if (!attr) return attr;

    const option = (item) => ({
      value: item,
      label: item,
    });

    if (Array.isArray(attr)) {
      return attr.map(option);
    }

    return option(attr);
  };

  const onResourseSelect = ({ value }) => {
    setSelectedResource(value);
  };

  const onRoleSelect = ({ value }) => {
    const actions = getActions(permissions, selectedResource, value);

    setActions(actions);
    setSelectedRole(value);
  };

  const onActionSelect = ({ value }) => {
    setSelectedAction(value);
  };

  const onAttributeSelect = (newValue) => {
    const attributesToUpdate = (newValue || []).reduce((acc, next) => {
      if (Array.isArray(next.value)) {
        acc = [...acc, ...next.value];
      } else {
        acc = [...acc, next.value];
      }

      return acc;
    }, []);

    setAttributes(attributesToUpdate);
  };

  const getPermission = () => {
    return permissions.find(item => {
      return item.resource === selectedResource
        && item.action === selectedAction
        && item.role === selectedRole;
    });
  };

  const onPermissionUpdate = () => {
    const _id = permissionToEdit?._id || getPermission()._id;
    onUpdate(_id, { attributes });
    setIsOpen(false);
  };

  return (
    <Drawer open={isOpen} onClose={setIsOpen}>
      <Drawer.Header>
        Add attributes
      </Drawer.Header>
      <Drawer.Body>
        <Form.Group>
          <Form.Label>Choose a resource</Form.Label>
          <Select
            onChange={onResourseSelect}
            options={resources}
            value={createValue(permissionToEdit.resource)}
            isDisabled={isInEdit}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Choose a role</Form.Label>
          <Select
            onChange={onRoleSelect}
            isDisabled={!selectedResource || isInEdit}
            value={createValue(permissionToEdit.role)}
            options={getRoles()}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Choose an action</Form.Label>
          <Select
            onChange={onActionSelect}
            isDisabled={!selectedRole || isInEdit}
            value={createValue(permissionToEdit.action)}
            options={actions}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Enter attributes</Form.Label>
          <CreatableSelect
            isClearable
            isMulti
            isDisabled={!selectedAction && !isInEdit}
            defaultValue={createValue(permissionToEdit.attributes)}
            onChange={onAttributeSelect}
          />
        </Form.Group>
      </Drawer.Body>
      <Drawer.Footer>
        <Button
          type="button"
          block
          onClick={onPermissionUpdate}
        >
          Save
        </Button>
      </Drawer.Footer>
    </Drawer>
  );
};

AddAttributesDrawer.propTypes = {
  permissions: arrayOf(object).isRequired,
  permissionToEdit: shape(object),
  isOpen: bool,
  setIsOpen: func.isRequired,
  onUpdate: func.isRequired,
};

AddAttributesDrawer.defaultProps = {
  permissionToEdit: null,
  isOpen: false,
};

export default AddAttributesDrawer;
