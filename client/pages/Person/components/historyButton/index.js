import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { func } from 'prop-types';
import Button from 'react-bootstrap/Button';

const HistoryButton = ({ onHistoryGet }) => {
  return (
    <>
      <Button onClick={onHistoryGet} size="sm" className="mb-4">
        <FontAwesomeIcon
          icon="history"
          className="cur-pointer"
        />
      </Button>
    </>
  );
};

HistoryButton.propTypes = {
  onHistoryGet: func.isRequired,
};

export default HistoryButton;
