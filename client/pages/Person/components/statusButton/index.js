import React from 'react';
import { shape, object, func } from 'prop-types';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { PERSON_POST_STATUSES } from 'common/constants';

const config = {
  [PERSON_POST_STATUSES.NEW]: {
    text: 'Start',
    variant: 'secondary',
    newStatus: PERSON_POST_STATUSES.IN_PROGRESS
  },
  [PERSON_POST_STATUSES.IN_PROGRESS]: {
    text: 'To Review',
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
    newStatus: PERSON_POST_STATUSES.ON_HOLD
  },
  [PERSON_POST_STATUSES.ON_HOLD]: [{
    text: 'Back to Review',
    variant: 'danger',
    newStatus: PERSON_POST_STATUSES.IN_REVIEW
  }, {
    text: 'Publish',
    variant: 'success',
    newStatus: PERSON_POST_STATUSES.PUBLISHED
  }],
};

const StatusButton = ({ updateStatus, permissions }) => {
  if (!permissions.canChangeStatus()) return null;

  const statusConfig = config[permissions.status];

  // eslint-disable-next-line
  const singleButton = ({ variant, text, newStatus }) => (
    <Button
      variant={variant}
      onClick={() => updateStatus(newStatus)}
      disabled={!permissions.canChangeStatus()}
      className="w-100 mb-4"
    >{ text }</Button>
  );

  return (
    <>
      { !Array.isArray(statusConfig) && singleButton(statusConfig) }

      { Array.isArray(statusConfig)
        && (
        <ButtonGroup className="w-100">
          { statusConfig.map(item => singleButton(item)) }
        </ButtonGroup>
        )}
    </>
  );
};

StatusButton.propTypes = {
  permissions: shape(object).isRequired,
  updateStatus: func
};

StatusButton.defaultProps = {
  updateStatus: () => {}
};

export default StatusButton;
