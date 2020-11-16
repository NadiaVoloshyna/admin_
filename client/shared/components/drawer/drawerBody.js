import React from 'react';
import classnames from 'classnames';
import { oneOfType, arrayOf, node, bool } from 'prop-types';

const DrawerBody = (props) => {
  const { children, noPadding } = props;
  const classNames = classnames('drawer-body', noPadding && 'drawer-body__no-padding');

  return (
    <>
      <div className={classNames}>{ children }</div>

      <style jsx>{`
        .drawer-body {
          width: 100%;
          height: 100%;
          padding: 24px;
          overflow: scroll;
          background-color: #f4f4f4; // TODO: change to variable
        }

        .drawer-body__no-padding {
          padding: 0;
        }
      `}</style>
    </>
  );
};

DrawerBody.propTypes = {
  children: oneOfType([
    arrayOf(node),
    node
  ]).isRequired,
  noPadding: bool,
};

DrawerBody.defaultProps = {
  noPadding: false,
};

export default DrawerBody;
