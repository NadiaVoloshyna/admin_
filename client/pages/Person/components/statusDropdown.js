import React from 'react';
import { shape, oneOf, func } from 'prop-types';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { PERSON_POST_STATUSES } from 'shared/constants/index';
import { UserType } from 'common/prop-types/authorization/user';

const config = {
  NEW: {
    text: 'Start',
    variant: 'primary',
    roles: ['author', 'admin', 'super']
  },
  IN_PROGRESS: {
    text: 'Send to Review',
    variant: 'primary',
    roles: ['author', 'admin', 'super']
  },
  IN_REVIEW: [
    { text: 'Reject', variant: 'danger' },
    { text: 'Accept', variant: 'success' }
  ],
  PRE_PUBLISH: { text: 'Publish', variant: '' }
};

const StatusDropdown = ({ status, user, updateStatus }) => {
  const statusConfig = config[status];
  const canChangeStatus = config[status].roles.includes(user.role);

  const singleButton = (variant, text) => (
    <Button
      variant={variant}
      onClick={updateStatus}
      disabled={!canChangeStatus}
    >{ text }</Button>
  );

  return (
    <>
      { !Array.isArray(statusConfig) && singleButton(statusConfig.variant, statusConfig.text) }

      { Array.isArray(statusConfig)
        && (
        <ButtonGroup>
          { statusConfig.map(item => singleButton(...item)) }
        </ButtonGroup>
        )}
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
  status: oneOf(Object.values(PERSON_POST_STATUSES)).isRequired,
  user: shape(UserType).isRequired,
  updateStatus: func
};

StatusDropdown.defaultProps = {
  updateStatus: () => {}
};

export default StatusDropdown;
