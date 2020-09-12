import React from 'react';
import { oneOfType, arrayOf, node, bool, func } from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import DrawerHeader from './drawerHeader';
import DrawerFooter from './drawerFooter';
import DrawerBody from './drawerBody';

const Drawer = (props) => {
  const { children, open, onClose, backdropClose } = props;

  const clonedChildren = React.Children.map(children, child => {
    const props = { onClose };

    if (React.isValidElement(child) && child.type.name === 'DrawerHeader') {
      return React.cloneElement(child, props);
    }
    return child;
  });

  const onBackdropClick = () => {
    backdropClose && onClose(false);
  };

  return (
    <>
      <CSSTransition
        in={open}
        timeout={300}
        classNames="drawer"
        unmountOnExit
      >
        <div className="drawer">{ clonedChildren }</div>
      </CSSTransition>

      <CSSTransition
        in={open}
        timeout={300}
        classNames="drawer-backdrop"
        unmountOnExit
      >
        <div
          className="drawer-backdrop"
          onClick={onBackdropClick}
        />
      </CSSTransition>

      <style jsx>{`
        .drawer {
          position: fixed;
          top: 0;
          right: -360px;
          width: 360px;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: #E4E4E4;
          z-index: 200;
        }

        .drawer-enter {
          transform: translateX(0);
        }

        .drawer-enter-active {
          transform: translateX(-360px);
          transition: transform 300ms ease-in-out;
        }

        .drawer.drawer-enter-done {
          right: 0;
        }

        .drawer-exit {
          transform: translateX(-360px);
        }

        .drawer-exit-active {
          transform: translateX(0);
          transition: transform 300ms ease-in-out;
        }

        .drawer-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          content: ' ';
          background: #000;
          opacity: 0;
          z-index: 199;
        }

        .drawer-backdrop-enter {
          opacity: 0;
        }

        .drawer-backdrop-enter-active {
          opacity: .1;
          transition: opacity 300ms ease-in-out;
        }
        
        .drawer-backdrop-enter-done {
          opacity: .1;
        }

        .drawer-backdrop-exit {
          opacity: .1;
        }

        .drawer-backdrop-exit-active {
          opacity: 0;
          transition: opacity 300ms ease-in-out;
        }
      `}</style>
    </>
  );
};

Drawer.propTypes = {
  children: oneOfType([
    arrayOf(node),
    node
  ]).isRequired,
  open: bool,
  onClose: func.isRequired,
  backdropClose: bool,
};

Drawer.defaultProps = {
  open: false,
  backdropClose: true,
};

Drawer.Header = DrawerHeader;
Drawer.Footer = DrawerFooter;
Drawer.Body = DrawerBody;

export default Drawer;

/*
Usage

  <Drawer
    backdropClose
    open={isOpen}
    onClose={setIsOpen}
  >
    <Drawer.Header>Invite User</Drawer.Header>
    <Drawer.Body>
      <p>Any component</p>
    </Drawer.Body>
    <Drawer.Footer>
      <Button>Send Invitation</Button>
    </Drawer.Footer>
  </Drawer>
*/
