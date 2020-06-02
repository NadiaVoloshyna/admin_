import React from 'react';
import { connect } from 'react-redux';
import { actions as pageActions } from 'pages/Auth/Register/actions';
import RegisterPage from 'pages/Auth/Register';

const Register = (props) => <RegisterPage {...props} />;

Register.getInitialProps = (ctx) => {
  const  { query } = ctx;

  return { token: query.token };
}

const mapDispatchToProps = {
  registerUser: pageActions.registerUser
};

export default connect(null, mapDispatchToProps)(Register);
