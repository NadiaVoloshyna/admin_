import React, { useState } from 'react';
import { shape, arrayOf, object } from 'prop-types';
import _upperFirst from 'lodash/upperFirst';
import useErrorHandler from 'shared/hooks/useErrorHandler';
import Layout from 'shared/components/layout';
import { ERROR_MESSAGES, PAGE_NAMES } from 'shared/constants';
import { USER_ROLES } from 'common/constants';
import { UserType } from 'common/prop-types/authorization/user';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import PermissionsAPI from './api';
import { flattenPermissions } from './utils';
import AddPermissionDrawer from './components/addPermissionDrawer';
import AddAttributesDrawer from './components/addAttributesDrawer';
import AttributesTooltip from './components/attributesTooltip';

const PermissionsPage = ({ permissions: rawPermissions, user }) => {
  const handleError = useErrorHandler();

  const [permissions, setPermissions] = useState(rawPermissions);
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAttributeDrawerOpen, setIsAttributeDrawerOpen] = useState(false);
  const [permissionToEdit, setPermissionToEdit] = useState({});

  const transformedPermissions = flattenPermissions(permissions);

  const onPermissionUpdate = async (id, updates) => {
    setIsLoading(true);

    try {
      const index = permissions.findIndex(item => item._id === id);
      permissions[index] = {
        ...permissions[index],
        ...updates
      };

      await PermissionsAPI.updatePermission(id, permissions[index]);
      setPermissions(permissions);
    } catch (error) {
      handleError(error, ERROR_MESSAGES.PERMISSION_UPDATE);
    } finally {
      setIsLoading(false);
    }
  };

  const onPermissionChange = (event, item) => {
    const permitted = event.target.checked;
    const { _id } = item;
    onPermissionUpdate(_id, { permitted });
  };

  const onPermissionAdd = async (params) => {
    setIsDrawerOpen(false);
    setIsLoading(true);

    try {
      const { data: newPermissions } = await PermissionsAPI.createPermissions(params);

      setPermissions([...permissions, ...newPermissions]);
    } catch (error) {
      handleError(error, ERROR_MESSAGES.PERMISSION_CREATE);
    } finally {
      setIsLoading(false);
    }
  };

  const onPermissionRemove = async (item) => {
    const ids = item.roles.map(item => item._id);
    setIsLoading(true);

    try {
      const requests = ids.map(id => PermissionsAPI.deletePermission(id));
      await Promise.all(requests);

      const newPermissions = permissions.filter(item => !ids.includes(item._id));

      setPermissions(newPermissions);
    } catch (error) {
      handleError(error, ERROR_MESSAGES.PERMISSION_DELETE);
    } finally {
      setIsLoading(false);
    }
  };

  const openAttributesDrawerForEdit = (item) => {
    setPermissionToEdit(item);
    setIsAttributeDrawerOpen(true);
  };

  const onAddAttributesDrawerClose = () => {
    setPermissionToEdit({});
    setIsAttributeDrawerOpen(false);
  };

  return (
    <>
      <Layout activePage={PAGE_NAMES.PERMISSIONS} user={user}>
        <Layout.Navbar className="mb-3">
          <Button type="button" onClick={() => setIsDrawerOpen(true)}>
            Add permission
          </Button>

          <Button type="button" onClick={() => setIsAttributeDrawerOpen(true)}>
            Add attributes
          </Button>
        </Layout.Navbar>

        <Layout.Content isLoading={isLoading}>
          <Accordion>
            { transformedPermissions.map((permission, index) => (
              <Card key={permission.resource}>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey={index}>
                    {_upperFirst(permission.resource)}
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={index}>
                  <Card.Body>
                    <Table className="mb-0">
                      <thead>
                        <tr>
                          <th>&nbsp;</th>
                          { Object.keys(USER_ROLES).sort().map(key => (
                            <th key={key}>{ _upperFirst(key.toLowerCase()) }</th>
                          )) }
                          <th>&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                        { permission.actions.map((item) => (
                          <tr key={item.action}>
                            <td>{ item.action }</td>
                            { item.roles.map((item) => (
                              <td key={item._id}>
                                <div className="d-flex align-items-center">
                                  <Form.Switch
                                    type="switch"
                                    id={item._id}
                                    checked={item.permitted}
                                    onChange={(e) => onPermissionChange(e, item)}
                                    label=""
                                  />

                                  { !!item.attributes.length && (
                                    <AttributesTooltip
                                      permission={item}
                                      onEditClick={openAttributesDrawerForEdit}
                                    />
                                  )}
                                </div>
                              </td>
                            ))}
                            <td className="d-flex align-items-center">
                              <i
                                className="material-icons cur-pointer text-danger"
                                onClick={() => onPermissionRemove(item)}
                              >
                                close
                              </i>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            ))}
          </Accordion>
        </Layout.Content>
      </Layout>

      <AddPermissionDrawer
        permissions={permissions}
        isOpen={isDrawerOpen}
        setIsOpen={setIsDrawerOpen}
        onAdd={onPermissionAdd}
      />

      <AddAttributesDrawer
        permissions={permissions}
        permissionToEdit={permissionToEdit}
        isOpen={isAttributeDrawerOpen}
        setIsOpen={onAddAttributesDrawerClose}
        onUpdate={onPermissionUpdate}
      />
    </>
  );
};

PermissionsPage.propTypes = {
  permissions: arrayOf(object).isRequired,
  user: shape(UserType).isRequired,
};

export default PermissionsPage;
