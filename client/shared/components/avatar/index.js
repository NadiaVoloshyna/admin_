import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import classnames from 'classnames';
import { shape, func, oneOf, string, oneOfType, element } from 'prop-types';
import { UserType } from 'common/prop-types/authorization/user';
import { Image } from 'react-bootstrap';

import styles from './index.module.scss';

// TODO: this has to be moved into config
const IMAGE_URL = 'https://storage.googleapis.com/ukrainian-assets/';

const Avatar = ({ user, size, onEdit, className, popoverContent }) => {
  const { image, firstName, lastName } = user;
  const canEdit = Boolean(onEdit);
  const usePopover = Boolean(popoverContent);

  const src = `${IMAGE_URL}${image}`;

  const initials = firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();

  const classes = classnames(
    styles.avatar,
    styles[size],
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
      { image && <Image src={src} roundedCircle /> }
      { !image && <div className={styles.initials}>{initials}</div> }
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
  user: shape(UserType).isRequired,
  onEdit: func,
  className: string,
  popoverContent: oneOfType([string, element]),
};

Avatar.defaultProps = {
  size: 'md',
  onEdit: null,
  className: '',
  popoverContent: null,
};

export default Avatar;
