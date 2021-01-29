import React, { useState } from 'react';
import { string, arrayOf, object, shape } from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { PageContext } from 'shared/context';
import { UserType } from 'common/prop-types/authorization/user';
import { cloneChildren } from 'shared/utils/react';
import LayoutContent from './content';
import LayoutNavbar from './navbar';
import LayoutMainMenu from './MainMenu';
import LayoutFooter from './footer';

const Layout = ({ activePage, children, user }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <PageContext.Provider value={{ setIsLoading }}>
      <div className={`${activePage.toLowerCase()}-page`}>
        <div className="container-fluid">
          <Row>
            <LayoutMainMenu
              activePage={activePage}
              user={user}
            />
            <Col className="d-flex flex-column vh-100 content-wrapper">
              { cloneChildren(children, { isLoading }) }
            </Col>
          </Row>
        </div>
        <style global jsx>{`
          .content-wrapper {
            margin-left: 72px;
          }
        `}</style>
      </div>
    </PageContext.Provider>
  );
};

Layout.Content = LayoutContent;
Layout.Navbar = LayoutNavbar;
Layout.Footer = LayoutFooter;

Layout.propTypes = {
  activePage: string,
  user: shape(UserType).isRequired,
  children: arrayOf(object).isRequired,
};

Layout.defaultProps = {
  activePage: '',
};

export default Layout;
