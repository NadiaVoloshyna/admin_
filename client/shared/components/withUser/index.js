import React from 'react'
import { UserContext } from 'shared/context';

export const withUser = (PageComponent) => {
  
  const WithUser = ({ ...props }) => {
    const { person, user } = props;

    if (!user) return <PageComponent {...props} />;

    const isSuper = user.role === 'super';
    const isAdmin = user.role === 'admin';
    const isAuthor = user.role === 'author';
    const isReviewer = user.role === 'reviewer';

    const userContext = {
      user: {
        ...user,
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
      },
      activePage: PageComponent.name
    }

    props = {
      ...props,
      user: userContext.user
    }

    return (
      <UserContext.Provider value={userContext}>
        <PageComponent {...props} />
      </UserContext.Provider>
    );
  }

  WithUser.getInitialProps = async context => {
    // Run getInitialProps from HOCed PageComponent
    const pageProps =
      typeof PageComponent.getInitialProps === 'function'
        ? await PageComponent.getInitialProps(context)
        : {};
        
    // Pass props to PageComponent
    return {
      ...pageProps,
    }
  }

  return WithUser
}