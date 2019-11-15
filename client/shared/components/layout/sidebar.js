import React from 'react';
import cx from 'classnames';
import Link from 'next/link'

const NAV_LINKS = [{
  name: 'Home',
  url: '/'
}, {
  name: 'Persons',
  url: '/persons'
}, {
  name: 'Professions',
  url: '/professions'
}];

// TODO: change to next link
const renderLinks = (active) => {
  return NAV_LINKS.map(link => (
    <Link key={link.name} href={link.url}>
      <a className={cx('nav-link', {'active': link.name === active})}>{ link.name }</a>
    </Link>
  ))
}

const LayoutSidebar = (props) => {
  return (
    <>
      <div className="col sidebar bg-light">
        <nav>
          { renderLinks(props.activePage) }
        </nav>
      </div>

      <style jsx>{`
        .sidebar {
          height: 100vh;
          border-right: 1px solid rgba(0,0,0,.1);
        }
      `}</style>
    </>
  )
}

export default LayoutSidebar
