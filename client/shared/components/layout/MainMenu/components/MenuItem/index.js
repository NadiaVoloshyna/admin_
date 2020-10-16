import React from 'react';
import { string, node, arrayOf, oneOfType, bool } from 'prop-types';
import cx from 'classnames';

import styles from './index.module.scss';

const MenuItem = ({ children, text, hovered, active, variant }) => {
  const classNames = cx(
    styles.menuItem,
    hovered && styles.hovered,
    active && styles.active,
    variant && styles[`menuItem__${variant}`],
  );

  return (
    <div className={classNames}>
      <div className={`${styles.icon} d-flex justify-content-center align-items-center`}>
        { children }
      </div>
      <span>{ text }</span>
    </div>
  );
};

MenuItem.propTypes = {
  children: oneOfType([
    arrayOf(node),
    node
  ]).isRequired,
  text: string.isRequired,
  hovered: bool,
  active: bool,
  variant: string,
};

MenuItem.defaultProps = {
  hovered: true,
  active: false,
  variant: '',
};

export default MenuItem;
