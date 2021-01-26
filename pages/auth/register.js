import React from 'react';
import Head from 'next/head';
import RegisterPage from 'pages/Auth/Register';
import WithError from 'shared/components/withError';
import { number, string } from 'prop-types';

const Register = (props) => (
  <WithError statusCode={props.statusCode} errorMessage={props.errorMessage}>
    <Head>
      <title>Register</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <RegisterPage {...props} />
  </WithError>
);

Register.getInitialProps = (ctx) => {
  const { query, res: { locals: { statusCode, errorMessage } } } = ctx;

  if (statusCode) {
    return { statusCode, errorMessage };
  }

  return { token: query.token };
};

Register.propTypes = {
  statusCode: number,
  errorMessage: string,
  token: string,
};

Register.defaultProps = {
  statusCode: null,
  errorMessage: null,
  token: '',
};

export default Register;
