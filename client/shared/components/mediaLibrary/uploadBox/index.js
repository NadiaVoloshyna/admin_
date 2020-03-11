import React from 'react';
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
}

export default UploadBox;