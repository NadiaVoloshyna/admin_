import React from 'react';
import { string, arrayOf, object } from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LayoutContent from './content';
import LayoutNavbar from './navbar';
import LayoutSidebar from './sidebar';

// export const LayoutContext = React.createContext({
//   activePage: null,
//   isLoading: false
// });

const Layout = (props) => {
  // const { activePage } = props;
  // const { user } = useSelector(state => state.user);
  // const { isLoading } = useSelector(state => state.shared);

  // const contextValue = {
  //   activePage,
  //   isLoading,
  //   user
  // }

  return (
    <div className={`${props.activePage.toLowerCase()}-page`}>
      <div className="container-fluid">
        {/* <LayoutContext.Provider value={contextValue}> */}
        <Row>
          <LayoutSidebar />
          <Col className="d-flex flex-column vh-100">
            { props.children }
          </Col>
        </Row>
        {/* </LayoutContext.Provider> */}
      </div>
    </div>
  );
};

Layout.Content = LayoutContent;
Layout.Navbar = LayoutNavbar;

Layout.propTypes = {
  activePage: string,
  children: arrayOf(object).isRequired
};

Layout.defaultProps = {
  activePage: ''
};

export default Layout;
