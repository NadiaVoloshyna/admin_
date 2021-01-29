import App from 'next/app';
import React from 'react';
import { elementType, shape, number } from 'prop-types';
import { UserContext } from 'shared/context';
import AlertProvider from 'shared/components/alertProvider';

import { createPermissions } from 'common/utils';
import { UserType } from '../common/prop-types/authorization/user';

import 'assets/styles/styles.scss';

class UkrainianAdminApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx) || {};
    }
    if (ctx.req && ctx.req.session.passport) {
      pageProps.user = ctx.req.user;
    }

    return { pageProps };
  }

  constructor(props) {
    super(props);

    this.state = {
      user: props.pageProps.user,
    };
  }

  render() {
    const { Component, pageProps } = this.props;
    const permissions = this.state.user?.permissions;

    const context = {
      user: this.state.user,
      activePage: Component.name,
    };

    const props = {
      ...pageProps,
      user: {
        ...this.state.user,
        ...createPermissions(permissions),
      },
    };

    return (
      <div className="bg-light">
        <AlertProvider>
          <UserContext.Provider value={context}>
            <Component {...props} />
          </UserContext.Provider>
        </AlertProvider>
      </div>
    );
  }
}

UkrainianAdminApp.propTypes = {
  Component: elementType.isRequired,
  pageProps: shape({
    user: shape(UserType),
    statusCode: number,
  }),
};

export default UkrainianAdminApp;
