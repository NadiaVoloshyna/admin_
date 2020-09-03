import React from 'react';
import { oneOfType, arrayOf, node, func } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DrawerHeader = (props) => {
  const { children, onClose } = props;

  return (
    <>
      <div className="drawer-header">
        <h4>{ children }</h4>
        <FontAwesomeIcon
          icon="times"
          size="lg"
          className="cursor-pointer"
          onClick={() => onClose(false)}
        />
      </div>

      <style jsx>{`
        .drawer-header {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 88px;
          padding: 24px;
          background: white;
        }
      `}</style>
    </>
  );
};

DrawerHeader.propTypes = {
  children: oneOfType([
    arrayOf(node),
    node
  ]).isRequired,

  onClose: func.isRequired,
};

export default DrawerHeader;
