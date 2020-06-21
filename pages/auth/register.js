import React from 'react';
import RegisterPage from 'pages/Auth/Register';

const Register = (props) => <RegisterPage {...props} />;

Register.getInitialProps = (ctx) => {
  const  { query } = ctx;

  return { token: query.token };
}

export default Register;
