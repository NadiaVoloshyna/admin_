import React from 'react';
import classnames from 'classnames';
import { oneOfType, arrayOf, node, bool } from 'prop-types';
import styles from './index.module.scss';

const DrawerBody = (props) => {
  const { children, noPadding } = props;
  const classNames = classnames(styles['drawer-body'], noPadding && styles['drawer-body__no-padding']);

  return (
    <>
      <div className={classNames}>{ children }</div>
    </>
  );
};

DrawerBody.propTypes = {
  children: oneOfType([
    arrayOf(node),
    node,
  ]).isRequired,
  noPadding: bool,
};

DrawerBody.defaultProps = {
  noPadding: false,
};

export default DrawerBody;
