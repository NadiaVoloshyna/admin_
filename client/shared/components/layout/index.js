import React from 'react';
import { useSelector } from 'react-redux';
import { string, bool } from 'prop-types';
import LayoutContent from './content';
import LayoutNavbar from './navbar';

export const LayoutContext = React.createContext({
  activePage: null,
  isLoading: false
});

const Layout = (props) => {
  const { activePage, isLoading } = props;
  const { user } = useSelector(state => state.user);

  const contextValue = {
    activePage, 
    isLoading,
    user
  }

  return (
    <div className={`${props.activePage.toLowerCase()}-page`}>
      <div className='container-fluid'>
        <LayoutContext.Provider value={contextValue}>
          { props.children }
        </LayoutContext.Provider>
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
