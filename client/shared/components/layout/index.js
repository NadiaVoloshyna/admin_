import React from 'react';
import { string, bool } from 'prop-types';
import LayoutContent from './content';
import LayoutSidebar from './sidebar';
import LayoutNavbar from './navbar';

const Layout = (props) => {
  return (
    <div className={`${props.activePage.toLowerCase()}-page`}>
      <div className='container-fluid'>
        <div className="row">
          <LayoutSidebar 
            active={props.activePage}
          /> 

          <div className="col-10">
            { props.children }
          </div>
        </div>
      </div>
    </div>
  )
}

Layout.Content = LayoutContent;
Layout.Navbar = LayoutNavbar;

Layout.propTypes = {
  activePage: string,
  isLoading: bool
}

Layout.defaultProps = {
  activePage: '',
  isLoading: false
}

export default Layout
