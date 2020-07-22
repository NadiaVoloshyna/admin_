import React, { useCallback } from 'react';
import { string, func, elementType } from 'prop-types';
import { useDropzone } from 'react-dropzone';

const Dropzone = ({ text, onDrop, component: Component }) => {
  const onDropCallback = useCallback(onDrop, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDropCallback
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      { !!Component && <Component /> }
      { !Component && <p>{ text }</p> }
    </div>
  );
};

Dropzone.propTypes = {
  text: string,
  onDrop: func.isRequired,
  component: elementType
};

Dropzone.defaultProps = {
  text: 'Drop or select file here',
  component: null
};

export default Dropzone;
