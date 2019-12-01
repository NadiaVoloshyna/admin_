import React from 'react'
import App from 'next/app';
import Error from 'next/error'

export const withError = (PageComponent, role, { ssr } = {}) => {
  const WithError = ({ errorCode, ...props }) => {
    if (errorCode) {
      return <Error statusCode={errorCode} />
    }

    return <PageComponent {...props} />;
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
    WithError.getInitialProps = async context => {

      // Run getInitialProps from HOCed PageComponent
      const pageProps =
        typeof PageComponent.getInitialProps === 'function'
          ? await PageComponent.getInitialProps(context)
          : {};
          
      const errorCode = pageProps.user 
        && pageProps.user.role
        && pageProps.user.role !== role;

      // Pass props to PageComponent
      return {
        ...pageProps,
        errorCode: errorCode ? 400 : null
      }
    }
  }

  return WithError
}