import React from 'react';
import { useDispatch } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import _lowerCase from 'lodash/lowerCase';
import _startCase from 'lodash/startCase';
import PersonAPI from 'pages/person/api';
import { actions } from 'pages/person/actions';
import { actions as sharedActions } from 'shared/actions';

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
}

const getStatusActions = (status) => {
  return PERMISSIONS[status];
}

const StatusDropdown = ({ status, personId, user, permissions }) => {
  const dispatch = useDispatch();
  const myPermission = permissions.find(item => item.user._id === user._id);
  const canChangeStatus = myPermission && myPermission.active || user.userRoleUp('admin');
  const statusConfig = getStatusActions(status);
  const hasPriviladge = statusConfig.roles.find(item => item.indexOf(user.role) !== -1);

  if (!canChangeStatus || !hasPriviladge) {
    return (
      <Button 
        variant={statusConfig.variant} 
        className="status-dropdown"
      >{ _startCase(_lowerCase(status)) }</Button>
    )
  }

  const updateStatus = (newStatus) => {
    dispatch(sharedActions.toggleIsLoading());
    PersonAPI.updateStatus(personId, newStatus)
      .then(() => {
        dispatch(actions.setStatus(newStatus));
        dispatch(sharedActions.toggleIsLoading());
      })
      .catch(error => {
        console.log(error);
        dispatch(sharedActions.toggleIsLoading());
      });
  }
  
  return (
    <>
      <Dropdown as={ButtonGroup} className="status-dropdown" alignRight>
        <Button variant={statusConfig.variant}>{ _startCase(_lowerCase(status)) }</Button>

        <Dropdown.Toggle split variant={statusConfig.variant} id="dropdown-split-basic" />

        <Dropdown.Menu>
          { statusConfig.actions.map((item, index) => {
            return (
              <Dropdown.Item 
                key={item.name + index}
                onClick={() => updateStatus(item.status)}>{ item.name }
              </Dropdown.Item>
            )
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
  )
}

export default StatusDropdown;