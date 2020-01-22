import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import Dropdown from 'react-bootstrap/Dropdown';
import { LayoutContext } from './index';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <>
    <span
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </span>
    <style jsx>{`
      span:hover {
        cursor: pointer;
        color: var(--blue);
      }
    `}</style>
  </>
));

const LayoutNavbar = (props) => {
  const { user } = useContext(LayoutContext);

  return (
    <>
      <div className="row">
        <Navbar variant="light" bg="white" className="layout-navbar shadow-sm" fixed="top">
          <div className="user-wrapper d-flex justify-content-between align-items-center border-right h-100">
            <div className="user-name d-flex justify-content-start"> 
              <Dropdown>
                <Dropdown.Toggle as={CustomToggle}>
                  <span>Welcome, { user && user.name } <small>&#x25bc;</small></span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Link href={`/users/${user.id}`}>
                    <a className="dropdown-item">
                        Profile
                    </a>
                  </Link>
                  <Link href="/autoh/logout">
                    <a className="dropdown-item">
                        Logout
                    </a>
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            {/* <div className="user-icon">
              <FontAwesomeIcon icon='user-tie' size="2x" />
            </div> */}
          </div>

          <div className="px-3">
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

        .layout-navbar .user-name {
          padding: 0 16px;
        }

        .user-wrapper {
          width: 320px;
        }
      `}</style>
    </>
  )
}

export default LayoutNavbar
