import App from 'next/app';
import React from 'react';
import { UserContext } from 'shared/context';
import { library } from '@fortawesome/fontawesome-svg-core';
//import { fab } from '@fortawesome/free-brands-svg-icons'
import { 
  faTrashAlt, 
  faUserTie, 
  faCalendarAlt,
  faEllipsisV,
  faHome,
  faPhotoVideo,
  faUsers,
  faUserShield,
  faIdCard,
  faFolder,
  faImage,
  faCompactDisc,
  faFileAudio
} from '@fortawesome/free-solid-svg-icons';

import { destructureUser } from 'utils/user';

import 'assets/styles/styles.scss';

library.add(
  faTrashAlt, 
  faUserTie, 
  faCalendarAlt, 
  faEllipsisV, 
  faHome, 
  faPhotoVideo, 
  faUsers,
  faUserShield,
  faIdCard,
  faFolder,
  faImage,
  faCompactDisc,
  faFileAudio
);

class UkrainianAdminApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx) || {};
    }
    if (ctx.req && ctx.req.session.passport) {
      pageProps.user = ctx.req.session.passport.user;
      pageProps.user = pageProps.user;
    }
    return { pageProps };
  }

  constructor(props) {
    super(props);
    this.state = {
      user: destructureUser(props.pageProps.user)
    };
  }

  render () {
    const { Component, pageProps } = this.props;

    const context = {
      user: this.state.user,
      activePage: Component.name
    };

    const props = {
      ...pageProps,
      user: this.state.user,
    };

    return (
      <div className="bg-light">
        <UserContext.Provider value={context}>
          <Component {...props} />
        </UserContext.Provider>
      </div>
    )
  }
}

export default UkrainianAdminApp;