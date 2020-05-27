import React from 'react'
import { connect } from 'react-redux';
import { actions as pageActions } from 'pages/users/actions';
import LoginPage from 'pages/Login';

const Login = (props) => <LoginPage {...props}/>

const mapDispatchToProps = {
  loginUser: pageActions.loginUser
};

export default connect(null, mapDispatchToProps)(Login);
