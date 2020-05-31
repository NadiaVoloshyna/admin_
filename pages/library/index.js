import React from 'react';
import { connect } from 'react-redux';
import { actions as pageActions } from 'pages/Library/actions';
import { initialState } from 'pages/Library/reducers';
import LibraryPage from 'pages/Library';

const Library = (props) => <LibraryPage {...props} />

Library.getInitialProps = (ctx) => {
  const { store } = ctx;
  store.dispatch(pageActions.libraryInitialState(initialState));
}

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(Library);
