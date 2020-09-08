import React from 'react';
import { oneOfType, arrayOf, node } from 'prop-types';

const DrawerFooter = (props) => {
  const { children } = props;

  return (
    <>
      <div className="drawer-footer">{ children }</div>

      <style jsx>{`
        .drawer-footer {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 88px;
          padding: 24px;
          background: white;
        }
      `}</style>
    </>
  );
};

DrawerFooter.propTypes = {
  children: oneOfType([
    arrayOf(node),
    node
  ]).isRequired
};

export default DrawerFooter;
