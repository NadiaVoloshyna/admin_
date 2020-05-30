import React from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Dropdown from 'react-bootstrap/Dropdown';
import _upperFirst from 'lodash/upperFirst';
import ElipsisDropdownToggle from 'shared/components/elipsisDropdownToggle';
import AssigneUsersModal from 'shared/components/assigneUsersModal';

const PersonUserList = ({ permissions = [], personId, userPermissions }) => {
  return (
    <Card className="person-user-list">
      <Card.Header className="border-bottom-0 d-flex justify-content-between">
        Users

        { userPermissions.createAny('person-assignUser').granted &&
          <Dropdown>
            <Dropdown.Toggle as={ElipsisDropdownToggle} />

            <Dropdown.Menu>
              <AssigneUsersModal 
                as={<Dropdown.Item>Invite Author</Dropdown.Item>}
                personId={personId}
                assignedUsers={permissions}
                role="author"
              />
              <AssigneUsersModal 
                as={<Dropdown.Item>Invite Reviewer</Dropdown.Item>}
                personId={personId}
                assignedUsers={permissions}
                role="reviewer"
              />
            </Dropdown.Menu>
          </Dropdown>
        }
      </Card.Header>
      
      { !!permissions.length &&
        <Table className="m-0">
          <tbody>
            { permissions.map(item => {
              const { role, user, _id } = item;

              return (
                <tr key={_id}>
                  <td>{ user.firstName } { user.lastName }</td>
                  <td>{ _upperFirst(role) }</td>
                  <td className="text-right"><Badge variant="success">Active</Badge></td>
                  { userPermissions.createAny('person-canDeactivate').granted && 
                    <td className="text-right">
                      <Dropdown>
                        <Dropdown.Toggle as={ElipsisDropdownToggle} />

                        <Dropdown.Menu>
                          <Dropdown.Item>Deactivate</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  }
                </tr>
              )
            })}
          </tbody>
        </Table>
      }

      <style>{`
        .person-user-list .card-header {
          padding-left: 12px;
          padding-right: 12px;
        }
      `}</style>
    </Card>
  )
}

export default PersonUserList;