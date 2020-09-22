import React from 'react';
import { arrayOf, shape, func } from 'prop-types';
import classnames from 'classnames';
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
  assignees,
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

      { !!assignees.length
        && (
        <Table className="m-0">
          <tbody>
            { assignees.map(item => {
              const { active, user: assignee } = item;
              const { role, _id, firstName, lastName } = assignee;

              return (
                <tr className={classnames(!active && 'table-secondary')} key={_id}>
                  <td>{ firstName } { lastName }</td>
                  <td>{ _upperFirst(role) }</td>
                  <td className="text-right">
                    { active && <Badge variant="success">Active</Badge> }
                    { !active && <Badge variant="secondary">Inactive</Badge> }
                  </td>
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
  assignees: arrayOf(shape(UsersType)),
  usersForAssignment: arrayOf(shape(UsersType)),
  user: shape(UsersType).isRequired,
  setPermission: func
};

PersonUserList.defaultProps = {
  onUsersGet: () => {},
  assignees: [],
  usersForAssignment: [],
  setPermission: () => {}
};

export default PersonUserList;
