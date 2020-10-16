import React from 'react';
import { string, arrayOf, object, shape } from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { UserType } from 'common/prop-types/authorization/user';
import LayoutContent from './content';
import LayoutNavbar from './navbar';
import LayoutMainMenu from './MainMenu';

const Layout = ({ activePage, children, user }) => {
  return (
    <div className={`${activePage.toLowerCase()}-page`}>
      <div className="container-fluid">
        <Row>
          <LayoutMainMenu
            activePage={activePage}
            user={user}
          />
          <Col className="d-flex flex-column vh-100 content-wrapper">
            { children }
          </Col>
        </Row>
      </div>
      <style global jsx>{`
        .content-wrapper {
          margin-left: 72px;
        }
      `}</style>
    </div>
  );
};

Layout.Content = LayoutContent;
Layout.Navbar = LayoutNavbar;

Layout.propTypes = {
  activePage: string,
  user: shape(UserType).isRequired,
  children: arrayOf(object).isRequired
};

Layout.defaultProps = {
  activePage: ''
};

export default Layout;
