import React, { useContext, useState } from 'react';
import { object, func, shape, arrayOf } from 'prop-types';
import cx from 'classnames';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from 'react-bootstrap/Dropdown';
import { UserContext } from 'shared/context';
import { UserType } from 'common/prop-types/authorization/user';
import ChangeRoleModal from '../changeRoleModal';

const NAV_LINKS = [{
  name: 'Home',
  url: '/',
  icon: 'home'
}, {
  name: 'Persons',
  url: '/persons',
  icon: 'user-shield' || 'male'
}, {
  name: 'Library',
  url: '/library',
  visibleTo: ['super', 'admin', 'author'],
  icon: 'photo-video'
}, {
  name: 'Professions',
  url: '/professions',
  icon: 'id-card' || 'address-card'
}, {
  name: 'Users',
  url: '/users',
  visibleTo: ['super', 'admin'],
  icon: 'users'
}, {
  name: 'Permissions',
  url: '/permissions',
  visibleTo: ['super', 'admin'],
  icon: 'id-badge'
}];

const renderLinks = (active, { role }) => {
  // TODO: change to filter
  const linksToRender = NAV_LINKS.reduce((acc, next) => {
    if (typeof next.visibleTo === 'undefined' || next.visibleTo.indexOf(role) !== -1) {
      acc.push(next);
    }

    return acc;
  }, []);

  return linksToRender.map(link => {
    const linkClassName = cx(
      'nav-link',
      link.name === active && 'active'
    );

    return (
      <Link key={link.name} href={link.url}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className={linkClassName}>
          <FontAwesomeIcon icon={link.icon} title={link.name} />
          <span className="d-none d-lg-inline ml-2">{ link.name }</span>
        </a>
      </Link>
    );
  });
};

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

CustomToggle.propTypes = {
  children: arrayOf(object).isRequired,
  onClick: func.isRequired
};

const RenderUserDropdown = (props) => {
  const { user } = props;
  const [isChangeRoleModalOpen, setIsOpen] = useState(false);
  const toggleIsModalOpen = () => setIsOpen(!isChangeRoleModalOpen);

  return (
    <div className="m-3">
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle}>
          <span className="user-icon border rounded-circle h4 m-0">
            { user.firstName.charAt(0) }
            { user.lastName.charAt(0) }
          </span>
          <span className="ml-2 d-none d-lg-inline">Welcome, { user.firstName }</span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            onClick={toggleIsModalOpen}
            className="dropdown-item"
          >
            Change role
          </a>
          <Link href={`/users/${user.id}`}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="dropdown-item">
              Profile
            </a>
          </Link>
          <Link href="/auth/logout">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="dropdown-item">
              Logout
            </a>
          </Link>
        </Dropdown.Menu>
      </Dropdown>

      <ChangeRoleModal
        show={isChangeRoleModalOpen}
        toggleShow={toggleIsModalOpen}
        userId={user._id}
        userRole={user.role}
      />

      <style jsx>{`
        .user-icon {
          width: 40px;
          height: 40px;
          display: inline-block;
          background: #fff;
          text-align: center;
          padding-top: 5px;
        }
      `}</style>
    </div>
  );
};

const LayoutSidebar = () => {
  const { activePage, user } = useContext(UserContext);

  return (
    <>
      <div className="sidebar d-flex flex-column">
        <div className="sidebar-header shadow-sm h3">
          <span>U</span>
          <span className="d-lg-none">A</span>
          <span className="d-none d-lg-inline">kraЇnian</span>
        </div>

        <nav className="flex-grow-1">
          { renderLinks(activePage, user) }
        </nav>

        <RenderUserDropdown user={user} />
      </div>

      <style global jsx>{`
        .sidebar {
          height: 100vh;
          border-right: 1px solid rgba(0,0,0,.1);
          width: 220px;
        }

        .sidebar .sidebar-header {
          display: flex;
          align-items: center;
          width: 100%;
          background: #fff;
          height: 54px;
          max-height: 54px;
          padding: 0 15px;
        }

        @media (max-width: 991.98px) {
          .sidebar {
            width: 70px;
            text-align: center;
          }

          .sidebar .nav-link {
            font-size: 1.5rem;
          }
        }

        .sidebar .nav-link {
          color: var(--gray-dark);
        }

        .sidebar .nav-link.active, .sidebar .nav-link:hover {
          color: var(--blue);
        }
      `}</style>
    </>
  );
};

RenderUserDropdown.propTypes = {
  user: shape(UserType).isRequired
};

export default LayoutSidebar;
