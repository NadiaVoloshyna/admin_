import React from 'react';
import { oneOfType, arrayOf, node } from 'prop-types';
import styles from './index.module.scss';

const DrawerFooter = (props) => {
  const { children } = props;

  return (
    <>
      <div className={styles['drawer-footer']}>{ children }</div>
    </>
  );
};

DrawerFooter.propTypes = {
  children: oneOfType([
    arrayOf(node),
    node,
  ]).isRequired,
};

export default DrawerFooter;
