import React from 'react';
import { bool } from 'prop-types';
import Collapse from 'react-bootstrap/Collapse';
import Jumbotron from 'react-bootstrap/Jumbotron';

const UploadBox = ({ open }) => {
  return (
    <Collapse in={open}>
      <Jumbotron className="h5 text-center">
        Drag and Drop files here
      </Jumbotron>
    </Collapse>
  );
};

UploadBox.propTypes = {
  open: bool.isRequired
};

export default UploadBox;
