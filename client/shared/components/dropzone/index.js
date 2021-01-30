import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { oneOf } from 'prop-types';
import classnames from 'classnames';
import ReactDropzone from 'react-dropzone';
import useErrorHandler from 'shared/hooks/useErrorHandler';
import { ERROR_MESSAGES } from 'shared/constants';
import FilesApi from 'shared/api/files';

import styles from './index.module.scss';

const Dropzone = forwardRef(({ variant }, ref) => {
  const handleError = useErrorHandler();
  const [files, setFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file),
    })));
  };

  const revokePreview = () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  };

  const onUpload = async () => {
    try {
      const { data: { file } } = await FilesApi.create(files[0]);

      if (!file) {
        throw new Error(ERROR_MESSAGES.USER_UPLOAD_PHOTO);
      }

      return file;
    } catch (error) {
      handleError(error, ERROR_MESSAGES.USER_UPLOAD_PHOTO);
    } finally {
      revokePreview();
    }
  };

  // Provide public api
  useImperativeHandle(ref, () => ({
    upload: onUpload,
    revokePreview,
  }));

  const previewStyles = {
    backgroundSize: '312px auto',
  };

  if (files.length) {
    previewStyles.backgroundImage = `url(${files[0].preview})`;
  }

  const classes = classnames(
    'img-thumbnail',
    styles.preview,
    variant === 'rounded' && styles.rounded,
  );

  return (
    <>
      <ReactDropzone onDrop={onDrop} accept="image/*">
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className={classes} style={previewStyles}>
            <input {...getInputProps()} />
            <p>Пепетягніть файл сюди або натисніть щоб вибрати файл</p>
          </div>
        )}
      </ReactDropzone>
    </>
  );
});

Dropzone.propTypes = {
  variant: oneOf(['rounded']),
};

Dropzone.defaultProps = {
  variant: null,
};

export default Dropzone;
