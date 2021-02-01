import React from 'react';
import { oneOfType, arrayOf, node, func } from 'prop-types';
import styles from './index.module.scss';

const DrawerHeader = (props) => {
  const { children, onClose } = props;

  return (
    <>
      <div className={styles['drawer-header']}>
        <h3 className="h3">{ children }</h3>
        <i
          className="material-icons cur-pointer"
          onClick={() => onClose(false)}
        >close</i>
      </div>
    </>
  );
};

DrawerHeader.propTypes = {
  children: oneOfType([
    arrayOf(node),
    node,
  ]).isRequired,

  onClose: func,
};

DrawerHeader.defaultProps = {
  onClose: () => {},
};

export default DrawerHeader;
