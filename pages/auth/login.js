import React from 'react';
import Head from 'next/head';
import LoginPage from 'pages/Auth/Login';

const Login = (props) => (
  <>
    <Head>
      <title>Login</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <LoginPage {...props} />
  </>
);

export default Login;
