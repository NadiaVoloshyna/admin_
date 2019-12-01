import React from 'react';
import cx from 'classnames';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LayoutNavbar from './navbar';

const NAV_LINKS = [{
  name: 'Home',
  url: '/'
}, {
  name: 'Persons',
  url: '/persons'
}, {
  name: 'Professions',
  url: '/professions'
}, {
  name: 'Users',
  url: '/users',
  visibleTo: 'admin'
}];

const renderLinks = (active, { isAdmin, isAuthor, isReviewer }) => {
  let linksToRender = NAV_LINKS.reduce((acc, next) => {
    if (isAdmin && next.visibleTo === 'admin' || typeof next.visibleTo === 'undefined') {
      acc.push(next);
    }

    return acc;
  }, []);
  
  return linksToRender.map(link => (
    <Link key={link.name} href={link.url}>
      <a className={cx('nav-link', {'active': link.name === active})}>{ link.name }</a>
    </Link>
  ))
}

const LayoutSidebar = (props) => {
  const userState = useSelector(state => state.shared);
  const { user } = userState;

  return (
    <>
      <div className="col sidebar">
        <LayoutNavbar>
          Welcome, { user && user.name }
          <div className="user-icon">
            <FontAwesomeIcon icon='user-tie' size="2x" />
          </div>
        </LayoutNavbar>

        <nav className="d-flex flex-column h-100">
          { renderLinks(props.activePage, userState) }

          <Link href="/auth/logout">
            <a className="nav-link mt-auto">Logout</a>
          </Link>
        </nav>
      </div>

      <style jsx>{`
        .sidebar {
          height: 100vh;
          border-right: 1px solid rgba(0,0,0,.1);
        }

        .user-icon {
          width: 38px;
          height: 38px;
          text-align: center;
        }
      `}</style>
    </>
  )
}

export default LayoutSidebar
