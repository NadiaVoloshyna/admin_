import React from 'react'
import App from 'next/app';
import { auth } from 'utils/auth';
import { UserContext } from 'shared/context';
import { getPermissions } from 'shared/permissionManager';

export const withUser = (PageComponent, { ssr } = {}) => {
  const withUser = ({ ...props }) => {
    const { user, person } = props;
    const isSuper = user.role === 'super';
    const isAdmin = user.role === 'admin';
    const isAuthor = user.role === 'author';
    const isReviewer = user.role === 'reviewer';

    const userContext = {
      ...user,
      isSuper,
      isAdmin,
      isAuthor,
      isReviewer,
      permissions: getPermissions(PageComponent.name, user, person),
      userRoleUp: (role) => {
        if (role === 'super') return isSuper;
        if (role === 'admin') return isSuper || isAdmin;
        if (role === 'author') return isSuper || isAdmin || isAuthor;
        if (role === 'reviewer') return true;
      }
    }

    const newProps = {
      ...props,
      user: userContext
    }

    return (
      <UserContext.Provider value={userContext}>
        <PageComponent {...newProps} />
      </UserContext.Provider>
    );
  }

  // Make sure people don't use this HOC on _app.js level
  if (process.env.NODE_ENV !== 'production') {
    const isAppHoc =
      PageComponent === App || PageComponent.prototype instanceof App
    if (isAppHoc) {
      throw new Error('The withRedux HOC only works with PageComponents')
    }
  }

  if (ssr || PageComponent.getInitialProps) {
    withUser.getInitialProps = async context => {
      const user = auth(context.ctx);
      // Don't invoke getInitialProps if user is not authenticated
      if (!user) return {};

      // Run getInitialProps from HOCed PageComponent
      const pageProps =
        typeof PageComponent.getInitialProps === 'function'
          ? await PageComponent.getInitialProps(context)
          : {};
          
      // Pass props to PageComponent
      return {
        ...pageProps,
        user
      }
    }
  }

  return withUser
}