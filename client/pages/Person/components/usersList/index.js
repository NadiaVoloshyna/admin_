import React from 'react';
import { arrayOf, shape, func } from 'prop-types';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Dropdown from 'react-bootstrap/Dropdown';
import _upperFirst from 'lodash/upperFirst';
import ElipsisDropdownToggle from 'shared/components/elipsisDropdownToggle';
import AssigneUsersModal from 'pages/Person/components/assigneUsersModal';
import { UsersType } from 'shared/prop-types/';

const PersonUserList = ({
  onUsersGet,
  users,
  usersForAssignment,
  user,
  setPermission
}) => {
  return (
    <Card className="person-user-list mb-4">
      <Card.Header className="border-bottom-0 d-flex justify-content-between">
        Users

        { user.assignUser('persons')
          && (
          <Dropdown>
            <Dropdown.Toggle as={ElipsisDropdownToggle} />

            <Dropdown.Menu>
              <AssigneUsersModal
                as={<Dropdown.Item>Invite Author</Dropdown.Item>}
                users={usersForAssignment}
                setPermission={setPermission}
                onUsersGet={onUsersGet}
                role="author"
              />
              <AssigneUsersModal
                as={<Dropdown.Item>Invite Reviewer</Dropdown.Item>}
                users={usersForAssignment}
                setPermission={setPermission}
                onUsersGet={onUsersGet}
                role="reviewer"
              />
            </Dropdown.Menu>
          </Dropdown>
          )}
      </Card.Header>

      { !!users.length
        && (
        <Table className="m-0">
          <tbody>
            { users.map(item => {
              const { role, user, _id } = item;

              return (
                <tr key={_id}>
                  <td>{ user.firstName } { user.lastName }</td>
                  <td>{ _upperFirst(role) }</td>
                  <td className="text-right"><Badge variant="success">Active</Badge></td>
                  { user.deactivateUser('persons')
                    && (
                    <td className="text-right">
                      <Dropdown>
                        <Dropdown.Toggle as={ElipsisDropdownToggle} />

                        <Dropdown.Menu>
                          <Dropdown.Item>Deactivate</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                    )}
                </tr>
              );
            })}
          </tbody>
        </Table>
        )}

      <style>{`
        .person-user-list .card-header {
          padding-left: 12px;
          padding-right: 12px;
        }
      `}</style>
    </Card>
  );
};

PersonUserList.propTypes = {
  onUsersGet: func,
  users: arrayOf(shape(UsersType)),
  usersForAssignment: arrayOf(shape(UsersType)),
  user: shape(UsersType).isRequired,
  setPermission: func
};

PersonUserList.defaultProps = {
  onUsersGet: () => {},
  users: [],
  usersForAssignment: [],
  setPermission: () => {}
};

export default PersonUserList;
