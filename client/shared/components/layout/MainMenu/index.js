import React from 'react';
import Link from 'next/link';
import { string, shape } from 'prop-types';
import { UserType } from 'common/prop-types/authorization/user';
import MenuItem from './components/MenuItem';
import UserDropdown from './components/UserDropdown';
import { NAV_LINKS } from './constants';

import styles from './index.module.scss';

const renderLinks = (active, { role }) => {
  const linksToRender = NAV_LINKS.filter(link => {
    return typeof link.visibleTo === 'undefined' || link.visibleTo.indexOf(role) !== -1;
  });

  return linksToRender.map(link => {
    return (
      <Link key={link.name} href={link.url}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className={styles.link}>
          <MenuItem text={link.name} active={link.name === active}>
            <i className="material-icons">{ link.icon }</i>
          </MenuItem>
        </a>
      </Link>
    );
  });
};

const MainMenu = ({ activePage, user }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.containerInner} d-flex flex-column justify-content-between h-100`}>

          <div>
            <MenuItem text="Ukrainians" hovered={false} variant="logo">
              <div className={`${styles.avatar} rounded-circle`} />
            </MenuItem>

            <nav>
              { renderLinks(activePage, user) }
            </nav>
          </div>

          <UserDropdown user={user} />
        </div>
      </div>
    </>
  );
};

MainMenu.propTypes = {
  activePage: string.isRequired,
  user: shape(UserType).isRequired,
};

export default MainMenu;
