import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { initMediaLibrary } from 'shared/third-party/cloudinary';

const INLINE_MEDIA_LIBRARY_ID = 'media-library-inline';

const MediaLibrary = (props) => {
  const { 
    inline = false, 
    onMediaSelect = () => {}, 
    btnText = 'Select Image',
    openOptions = {}
  } = props;

  useEffect(() => {
    initMediaLibrary({
      inline,
      containerId: INLINE_MEDIA_LIBRARY_ID,
      onMediaSelect
    });
  }, []);

  const onShow = () => {
    window.ml && window.ml.show(openOptions);
  }

  if (inline) {
    return <div className="h-100" id={INLINE_MEDIA_LIBRARY_ID} />;
  }

  return (
    <Button 
      variant="outline-secondary" 
      onClick={onShow}>
        { btnText }
    </Button>
  );
}

export default MediaLibrary;