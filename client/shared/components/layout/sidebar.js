import React, { useContext } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LayoutContext } from './index';

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
}];

const renderLinks = (active, { role }) => {
  let linksToRender = NAV_LINKS.reduce((acc, next) => {
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
        <a className={linkClassName}>
          <FontAwesomeIcon icon={link.icon} title={link.name} />
          <span className="d-none d-lg-inline ml-2">{ link.name }</span>
        </a>
      </Link>
    )
  });
}

const LayoutSidebar = () => {
  const { activePage, user } = useContext(LayoutContext);

  return (
    <>
      <div className="sidebar">
        <nav className="d-flex flex-column h-100">
          { renderLinks(activePage, user) }
        </nav>
      </div>

      <style global jsx>{`
        .sidebar {
          height: calc(100vh - 54px);
          border-right: 1px solid rgba(0,0,0,.1);
          width: 220px;
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

        .sidebar .user-icon {
          width: 38px;
          height: 38px;
          text-align: center;
        }

        .sidebar .nav-link {
          color: var(--gray-dark);
        }

        .sidebar .nav-link.active, .sidebar .nav-link:hover {
          color: var(--blue);
        }
      `}</style>
    </>
  )
}

export default LayoutSidebar
