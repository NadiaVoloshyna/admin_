import React from 'react';
import { string, func, oneOf } from 'prop-types';
import cx from 'classnames';
import styles from './index.module.scss';

export const IconBlock = ({ onClick, icon, variant, size }) => {
  if (!icon) return null;

  const classes = cx(
    styles[variant],
    styles[size],
  );

  return (
    <div className={classes}>
      <span className="material-icons" onClick={(event) => onClick(event, variant)}>
        {icon}
      </span>
    </div>
  );
};

IconBlock.propTypes = {
  icon: string.isRequired,
  variant: oneOf('prepend', 'append').isRequired,
  onClick: func,
  size: oneOf('sm', 'md', 'lg'),
};

IconBlock.defaultProps = {
  onClick: () => {},
  size: 'sm',
};

export default IconBlock;
