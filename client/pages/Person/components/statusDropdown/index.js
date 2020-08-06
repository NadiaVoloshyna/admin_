import React from 'react';
import { shape, oneOf, func } from 'prop-types';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { PERSON_POST_STATUSES } from 'common/constants';
import { UserType } from 'common/prop-types/authorization/user';

const config = {
  [PERSON_POST_STATUSES.NEW]: {
    text: 'Start',
    variant: 'secondary',
    newStatus: PERSON_POST_STATUSES.IN_PROGRESS
  },
  [PERSON_POST_STATUSES.IN_PROGRESS]: {
    text: 'Send to Review',
    variant: 'primary',
    newStatus: PERSON_POST_STATUSES.IN_REVIEW
  },
  [PERSON_POST_STATUSES.IN_REVIEW]: [{
    text: 'Reject',
    variant: 'danger',
    newStatus: PERSON_POST_STATUSES.IN_PROGRESS
  }, {
    text: 'Accept',
    variant: 'warning',
    newStatus: PERSON_POST_STATUSES.READY
  }],
  [PERSON_POST_STATUSES.READY]: [{
    text: 'Back to Review',
    variant: 'danger',
    newStatus: PERSON_POST_STATUSES.IN_REVIEW
  }, {
    text: 'Publish',
    variant: 'success',
    newStatus: PERSON_POST_STATUSES.PUBLISHED
  }],
  [PERSON_POST_STATUSES.PUBLISHED]: {
    text: 'Unpublish',
    variant: 'danger',
    newStatus: PERSON_POST_STATUSES.READY
  }
};

const StatusDropdown = ({ status, user, updateStatus }) => {
  const statusConfig = config[status];
  const permission = user.createAny('changeStatus');

  const attributes = permission.filter({ [status]: true });
  const canChangeStatus = permission.granted && Object.keys(attributes).length;

  // eslint-disable-next-line
  const singleButton = ({ variant, text, newStatus }) => (
    <Button
      variant={variant}
      onClick={() => updateStatus(newStatus)}
      disabled={!canChangeStatus}
    >{ text }</Button>
  );

  return (
    <>
      { !Array.isArray(statusConfig) && singleButton(statusConfig) }

      { Array.isArray(statusConfig)
        && (
        <ButtonGroup>
          { statusConfig.map(item => singleButton(item)) }
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
