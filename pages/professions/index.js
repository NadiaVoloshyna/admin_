import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'pages/professions/actions';
import { initialState } from 'pages/professions/reducers';
import ProfessionsPage from 'pages/Professions';

const Professions = (props) => <ProfessionsPage {...props} />

Professions.getInitialProps = (ctx) => {
  const { store } = ctx;

  store.dispatch(actions.professionsInitialState(initialState));
  store.dispatch(actions.getProfessions());
}

const mapDispatchToProps = {
  createProfession: actions.createProfession
};

export default connect(null, mapDispatchToProps)(Professions);
