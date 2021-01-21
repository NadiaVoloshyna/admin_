import React from 'react';
import LoginPage from 'pages/Auth/Login';
import Head from 'next/head';

const Login = (props) => {
  <>
    <Head>
      <title>Login</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <LoginPage {...props} />
  </>;
};

export default Login;
