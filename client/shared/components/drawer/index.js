import React from 'react';
import { oneOfType, arrayOf, node, bool, func } from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import DrawerHeader from './drawerHeader';
import DrawerFooter from './drawerFooter';
import DrawerBody from './drawerBody';

import styles from './index.module.scss';
import drawerTransitions from './transitions/drawer.module.scss';
import backdropTransitions from './transitions/backdrop.module.scss';

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
        classNames={drawerTransitions}
        unmountOnExit
      >
        <div className={styles.drawer}>{ clonedChildren }</div>
      </CSSTransition>

      <CSSTransition
        in={open}
        timeout={300}
        classNames={backdropTransitions}
        unmountOnExit
      >
        <div
          className={styles['drawer-backdrop']}
          onClick={onBackdropClick}
        />
      </CSSTransition>
    </>
  );
};

Drawer.propTypes = {
  children: oneOfType([
    arrayOf(node),
    node,
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
