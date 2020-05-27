import React  from 'react';
import { connect } from 'react-redux';
import { actions as pageActions } from 'pages/users/actions';
import { initialState } from 'pages/users/reducers';
import UsersPage from '../../client/pages/users';

const Users = (props) => <UsersPage {...props}/>

Users.getInitialProps = (ctx) => {
  const { store } = ctx;

  // Set initial state
  store.dispatch(pageActions.usersInitialState(initialState));
  store.dispatch(pageActions.getUsers());
}

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(Users);
