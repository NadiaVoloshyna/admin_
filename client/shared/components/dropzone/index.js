import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import cx from 'classnames';

const Dropzone = ({ className, text = 'Drop or select file here', src, onDrop }) => {
  const onDropCallback = useCallback(onDrop, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropCallback
  });
  
  const dropZoneClasses = cx(
    className,
    src && 'with-image'
  );

  return (
    <div className={dropZoneClasses} {...getRootProps()}>
      <input {...getInputProps()} />
      <p>{ text }</p>
      <style jsx>{`
        .with-image {
          background: transparent url('/images/${src}') no-repeat center/100%;
        }
      `}</style>
    </div>
  )
}

export default Dropzone;