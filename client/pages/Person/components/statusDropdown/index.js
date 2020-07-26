import React from 'react';
import { oneOf, shape, func } from 'prop-types';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import _lowerCase from 'lodash/lowerCase';
import _startCase from 'lodash/startCase';
import { PERSON_POST_STATUSES } from 'shared/constants/index';
import { UserType } from 'common/prop-types/authorization/user';
import permissions from '../../../../permissions';

const PERMISSIONS = {
  NEW: {
    actions: [{
      name: 'Start',
      status: 'IN_PROGRESS'
    }],
    roles: ['super', 'admin', 'author'],
    variant: 'secondary'
  },
  IN_PROGRESS: {
    actions: [{
      name: 'Send to review',
      status: 'IN_REVIEW'
    }],
    roles: ['super', 'admin', 'author'],
    variant: 'primary'
  },
  IN_REVIEW: {
    actions: [{
      name: 'Accept',
      status: 'READY_TO_PUBLISH'
    }, {
      name: 'Reject',
      status: 'IN_PROGRESS'
    }],
    roles: ['super', 'admin', 'reviewer'],
    variant: '???'
  },
  READY_TO_PUBLISH: {
    actions: [{
      name: 'Publish',
      status: 'PUBLISHED'
    }],
    roles: ['super', 'admin'],
    variant: 'warning'
  },
  PUBLISHED: {
    actions: [],
    roles: [],
    variant: 'success'
  }
};

const getStatusActions = (status) => {
  return PERMISSIONS[status];
};

const StatusDropdown = ({ status, user, updateStatus }) => {
  const canChangeStatus = permissions.can(user.role).createAny('changeStatus');
  const statusConfig = getStatusActions(status);
  const hasPriviladge = statusConfig.roles.find(item => item.indexOf(user.role) !== -1);

  if (canChangeStatus.granted === false || !hasPriviladge) {
    return (
      <Button
        variant={statusConfig.variant}
        className="status-dropdown"
      >{ _startCase(_lowerCase(status)) }</Button>
    );
  }

  return (
    <>
      <Dropdown as={ButtonGroup} className="status-dropdown" alignRight>
        <Button variant={statusConfig.variant}>{ _startCase(_lowerCase(status)) }</Button>

        <Dropdown.Toggle split variant={statusConfig.variant} id="dropdown-split-basic" />

        <Dropdown.Menu>
          { statusConfig.actions.map((item) => {
            return (
              <Dropdown.Item
                key={item.name}
                onClick={() => updateStatus(item.status)}
              >{ item.name }
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
      <style>{`
        .status-dropdown {
          width: 50%;
          flex-basis: 50%;
          flex-grow: 1;
          margin-right: 10px;
        }
      `}</style>
    </>
  );
};

StatusDropdown.propTypes = {
  status: oneOf(PERSON_POST_STATUSES).isRequired,
  user: shape(UserType).isRequired,
  updateStatus: func
};

StatusDropdown.defaultProps = {
  updateStatus: () => {}
};

export default StatusDropdown;
