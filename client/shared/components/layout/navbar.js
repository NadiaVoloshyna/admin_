import React from 'react';
import { string, element } from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import cx from 'classnames';

const LayoutNavbar = (props) => {
  const navBarCX = cx('layout-navbar shadow-sm w-100 justify-content-between',
    props.className);
  return (
    <>
      <div className="row">
        <div className="col p-0">
          <Navbar variant="light" bg="white" className={ navBarCX }>
            { props.children }
          </Navbar>
        </div>
      </div>

      <style global jsx>{`
        .layout-navbar {
          height: 54px;
          max-height: 54px;
        }
      `}</style>
    </>
  );
};

LayoutNavbar.propTypes = {
  className: string,
  children: element.isRequired
};

LayoutNavbar.defaultProps = {
  className: ''
};

export default LayoutNavbar;
