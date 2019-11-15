import React from 'react';
import LayoutContent from './content';
import LayoutSidebar from './sidebar';

import 'assets/styles/styles.scss';

const Layout = (props) => {
  return (
    <div className={`${props.activePage.toLowerCase()}-page`}>
      <div className='container-fluid'>
        <div className="row">
          <LayoutSidebar active={props.activePage} />
          <LayoutContent {...props} />
        </div>
      </div>
    </div>
  )
}

export default Layout
