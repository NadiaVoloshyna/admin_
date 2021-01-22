import React from 'react';
import classnames from 'classnames';
import { func, oneOf, string } from 'prop-types';
import { Image } from 'react-bootstrap';

import styles from './index.module.scss';

// TODO: this has to be moved into config
const IMAGE_URL = 'https://storage.googleapis.com/ukrainian-assets/';

const Avatar = ({ size, image, onEdit }) => {
  const classes = classnames(
    styles.avatar,
    styles[size],
    onEdit && styles.edit
  );

  const onClick = (src) => {
    onEdit && onEdit(src);
  };

  const src = image ? `${IMAGE_URL}${image}` : null;

  return (
    <div className={classes} onClick={onClick}>
      { src && <Image src={src} roundedCircle /> }
      <i className="material-icons photo">insert_photo</i>
      <i className="material-icons pencil shadow-sm">create</i>
    </div>
  );
};

Avatar.propTypes = {
  size: oneOf(['sm', 'md', 'lg']),
  image: string.isRequired,
  onEdit: func,
};

Avatar.defaultProps = {
  size: 'md',
  onEdit: null,
};

export default Avatar;
