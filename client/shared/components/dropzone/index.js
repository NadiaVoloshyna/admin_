import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const Dropzone = ({ text = 'Drop or select file here', onDrop, component: Component }) => {
  const onDropCallback = useCallback(onDrop, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropCallback
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      { !!Component && <Component /> }
      { !Component && <p>{ text }</p> }
    </div>
  )
}

export default Dropzone;