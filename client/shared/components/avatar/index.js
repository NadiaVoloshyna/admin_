import React from 'react';
import classnames from 'classnames';
import { func, oneOf, string } from 'prop-types';
import { Image } from 'react-bootstrap';

import styles from './index.module.scss';

const Avatar = ({ size, src, onEdit }) => {
  const classes = classnames(
    styles.avatar,
    styles[size],
    onEdit && styles.edit
  );

  const onClick = (src) => {
    onEdit && onEdit(src);
  };

  return (
    <div className={classes} onClick={onClick}>
      { src && <Image src={src} roundedCircle /> }
      <i className="material-icons">insert_photo</i>
    </div>
  );
};

Avatar.propTypes = {
  size: oneOf(['sm', 'md', 'lg']),
  src: string.isRequired,
  onEdit: func,
};

Avatar.defaultProps = {
  size: 'md',
  onEdit: null,
};

export default Avatar;
