import React from 'react';
import cx from 'classnames';

import '../../assets/styles/styles.scss';

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

const renderLinks = (active) => {
    return NAV_LINKS.map(link => (
        <a key={link.name} href={link.url} className={cx('nav-link', {'active': link.name === active})}>
            { link.name }
        </a>
    ))
}

const Layout = (props) => (
  <div>
    <div className='container-fluid'>
      <div className="row">
        <div className="col sidebar bg-light">
          <nav>
            { renderLinks(props.activePage) }
          </nav>
        </div>
        <div className="col-10 bg-light">
            <div className="row justify-content-center">
              <div className="col-10">
                { props.children }
              </div>
            </div>
        </div>
      </div>
    </div>

    <style jsx>{`
      .sidebar {
        height: 100vh;
        border-right: 1px solid rgba(0,0,0,.1);
      }
    `}</style>
  </div>
)

export default Layout
