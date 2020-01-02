import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { createUploadWidget } from 'shared/third-party/upload';

const CloudinaryUpload = ({ onSuccess, onError, btnText = 'Open Assets' }) => {
  const [widget, setWidget] = useState();

  useEffect(() => {
    const uploadWidjet = createUploadWidget(onSuccess, onError);
    setWidget(uploadWidjet);
  }, []);

  const onShow = () => {
    widget.open();
  }

  return (
    <Button 
      variant="outline-secondary" 
      onClick={onShow}>
        { btnText }
    </Button>
  );
}

export default CloudinaryUpload;