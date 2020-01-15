import React from 'react'
import App from 'next/app';
import { auth } from 'utils/auth';
import UserContext from '../userContext';

export const withUser = (PageComponent, { ssr } = {}) => {
  const withUser = ({ ...props }) => {
    const { user } = props;
    const isSuper = user.role === 'super';
    const isAdmin = user.role === 'admin';
    const isAuthor = user.role === 'author';
    const isReviewer = user.role === 'reviewer';
    const userContext = {
      isSuper,
      isAdmin,
      isAuthor,
      isReviewer,
      userRoleUp: (role) => {
        if (role === 'super') return isSuper;
        if (role === 'admin') return isSuper || isAdmin;
        if (role === 'author') return isSuper || isAdmin || isAuthor;
        if (role === 'reviewer') return true;
      }
    }

    return (
      <UserContext.Provider value={userContext}>
        <PageComponent {...props} />
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
      // Run getInitialProps from HOCed PageComponent
      const pageProps =
        typeof PageComponent.getInitialProps === 'function'
          ? await PageComponent.getInitialProps(context)
          : {};
          
      // Pass props to PageComponent
      return {
        ...pageProps,
        user: auth(context.ctx)
      }
    }
  }

  return withUser
}