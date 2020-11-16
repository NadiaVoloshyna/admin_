import React, { useState } from 'react';
import useListDataFetch from 'shared/hooks/useListDataFetch';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import BootstrapForm from 'react-bootstrap/Form';
import { Form, Field } from 'react-final-form';
import Drawer from 'shared/components/drawer';
import { USER_ROLES } from 'common/constants';

const roles = Object.values(USER_ROLES).filter(item => item !== USER_ROLES.SUPER);

const FilterByRoleDrawer = () => {
  const { addQueryParams, getQueryParams } = useListDataFetch();
  const role = getQueryParams('role');
  const selectedRoles = role ? role.split(',') : [];
  const [isOpen, setIsOpen] = useState(false);

  let submitHandler;

  const onFilterApply = async (values) => {
    addQueryParams('role', values.role);
    setIsOpen(false);
  };

  return (
    <div className="d-flex align-items-center">
      <div className="d-flex ml-4" onClick={() => setIsOpen(true)}>
        <i className="material-icons mr-2 cur-pointer">filter_list</i> Filter
      </div>

      <Drawer open={isOpen} onClose={setIsOpen}>
        <Drawer.Header>
          Filter
        </Drawer.Header>

        <Drawer.Body>
          By role
          <Form
            onSubmit={onFilterApply}
            initialValues={{ role: selectedRoles }}
            render={({ handleSubmit }) => {
              submitHandler = handleSubmit;

              return (
                <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                  <ListGroup>
                    { roles.map((item) => {
                      return (
                        <ListGroup.Item key={`roles_${item}`}>
                          <Field
                            name="role"
                            type="checkbox"
                            value={item}
                          >
                            {props => (
                              <BootstrapForm.Check
                                {...props.input} // eslint-disable-line react/prop-types
                                label={item}
                                id={`role-${item}`}
                              />
                            )}
                          </Field>
                        </ListGroup.Item>
                      );
                    }) }
                  </ListGroup>
                </form>
              );
            }}
          />
        </Drawer.Body>

        <Drawer.Footer>
          <Button
            type="button"
            block
            onClick={(event) => submitHandler(event)}
          >
            Apply Filter
          </Button>
        </Drawer.Footer>
      </Drawer>
    </div>
  );
};

export default FilterByRoleDrawer;
