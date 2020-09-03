import React from 'react';
import { oneOfType, arrayOf, node } from 'prop-types';

const DrawerBody = (props) => {
  const { children } = props;

  return (
    <>
      <div className="drawer-body">{ children }</div>

      <style jsx>{`
        .drawer-body {
          width: 100%;
          height: 100%;
          padding: 24px;
        }
      `}</style>
    </>
  );
};

DrawerBody.propTypes = {
  children: oneOfType([
    arrayOf(node),
    node
  ]).isRequired
};

export default DrawerBody;
