import React from 'react';
import { string } from 'prop-types';
import { Image } from 'react-bootstrap';

import './index.module.scss';

const Avatar = ({ size, img }) => {
  function renderAvatar(imgSrc) {
    if (imgSrc) {
      return (
        <Image src={imgSrc} roundedCircle />
      );
    }
    return (
      <div className="empty" />
    );
  }

  return (
    <div className={`avatar ${size}`}>
      {renderAvatar(img)}
    </div>
  );
};

Avatar.propTypes = {
  size: string,
  img: string
};

Avatar.defaultProps = {
  size: 'md',
  img: 'default'
};

export default Avatar;
