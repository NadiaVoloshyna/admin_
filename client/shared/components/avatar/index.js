import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import classnames from 'classnames';
import { func, oneOf, string, oneOfType, element } from 'prop-types';
import { Image } from 'react-bootstrap';

import styles from './index.module.scss';

// TODO: this has to be moved into config
const IMAGE_URL = 'https://storage.googleapis.com/ukrainian-assets/';

const Avatar = ({ fullName, sizeInitials, size, image, onEdit, className, popoverContent }) => {
  const canEdit = Boolean(onEdit);
  const usePopover = Boolean(popoverContent);

  const src = `${IMAGE_URL}${image}`;

  fullName = fullName.replace(' ', '');
  let initials = '';
  for (let i = 0; i < fullName.length; i++) {
    if (fullName[i] === fullName[i].toUpperCase()) {
      initials += fullName[i];
      if (initials.length === 2) {
        break;
      }
      initials;
    }
  }

  const classes = classnames(
    styles.avatar,
    styles[size],
    styles[sizeInitials],
    canEdit && styles.edit,
    className,
  );

  const onClick = (src) => {
    canEdit && onEdit(src);
  };

  const avatartTemplate = (
    <div
      className={classes}
      onClick={onClick}
    >
      { image ? (<Image src={src} roundedCircle />) : (<div className="initials">{initials}</div>)}
      { canEdit && (
        <>
          <i className="material-icons photo">insert_photo</i>
          <i className="material-icons pencil shadow-sm">create</i>
        </>
      )}
    </div>
  );

  if (usePopover) {
    return (
      <OverlayTrigger
        placement="top"
        delay={{ show: 150, hide: 150 }}
        overlay={(
          <Popover id={image}>
            <Popover.Content>
              { popoverContent }
            </Popover.Content>
          </Popover>
        )}
      >
        { avatartTemplate }
      </OverlayTrigger>
    );
  }

  return (
    <div>{ avatartTemplate }</div>
  );
};

Avatar.propTypes = {
  size: oneOf(['sm', 'md', 'lg']),
  sizeInitials: oneOf(['sminitials', 'lginitials']),
  image: string.isRequired,
  onEdit: func,
  fullName: string,
  className: string,
  popoverContent: oneOfType([string, element]),
};

Avatar.defaultProps = {
  size: 'md',
  sizeInitials: 'lginitials',
  onEdit: null,
  className: '',
  fullName: '',
  popoverContent: null,
};

export default Avatar;
