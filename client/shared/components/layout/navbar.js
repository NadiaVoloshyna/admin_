import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LayoutContext } from './index';

const LayoutNavbar = (props) => {
  const { user } = useContext(LayoutContext);

  return (
    <>
      <div className="row">
        <Navbar variant="light" bg="white" className="layout-navbar shadow-sm" fixed="top">
          <div className="col d-flex justify-content-between align-items-center border-right h-100">
            Welcome, { user && user.name }
            <div className="user-icon">
              <FontAwesomeIcon icon='user-tie' size="2x" />
            </div>
          </div>

          <div className="col-10">
            { props.children }
          </div>
        </Navbar>
      </div>

      <style global jsx>{`
        .layout-navbar {
          height: 54px;
          max-height: 54px;
          padding: 0;
        }
      `}</style>
    </>
  )
}

export default LayoutNavbar
