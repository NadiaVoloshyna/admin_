import React, { useRef } from 'react';
import { bool, func } from 'prop-types';
import Drawer from 'shared/components/drawer';
import Dropzone from 'shared/components/dropzone';
import Button from 'react-bootstrap/Button';

const UploadDrawer = ({ isOpen, onClose, onUpload }) => {
  const childRef = useRef();

  const onDrawerClose = () => {
    // Make sure to revoke the data uris to avoid memory leaks
    childRef.current.revokePreview();
    onClose();
  };

  const onSubmit = async () => {
    const image = await childRef.current.upload();
    onUpload(image);
    onClose();
  };

  return (
    <Drawer open={isOpen} onClose={onDrawerClose}>
      <Drawer.Header>
        Завантажити фото
      </Drawer.Header>

      <Drawer.Body>
        <Dropzone ref={childRef} />
      </Drawer.Body>

      <Drawer.Footer>
        <Button
          type="button"
          block
          onClick={onSubmit}
        >Завантажити фото</Button>
      </Drawer.Footer>
    </Drawer>
  );
};

UploadDrawer.propTypes = {
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  onUpload: func.isRequired,
};

export default UploadDrawer;
