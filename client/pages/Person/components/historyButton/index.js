import React from 'react';
import { func } from 'prop-types';
import Button from 'react-bootstrap/Button';

const HistoryButton = ({ onHistoryGet }) => {
  return (
    <>
      <Button onClick={onHistoryGet} size="sm" className="mb-4 d-flex align-items-center justify-content-center">
        <i className="material-icons cur-pointer">
          history
        </i>
      </Button>
    </>
  );
};

HistoryButton.propTypes = {
  onHistoryGet: func.isRequired,
};

export default HistoryButton;
