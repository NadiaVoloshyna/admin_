import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import cx from 'classnames';

const LayoutNavbar = (props) => {
  const navBarCX = cx('layout-navbar shadow-sm w-100',
    props.className && props.className
  )
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
  )
}

export default LayoutNavbar
