import React from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import Layout from 'components/layout';
import { actionTypes, actionCreator } from 'actions/person';
import { initialState } from '../store/reducers/professions';
import ProfessionsList from 'components/pages/professions/professionsList';

const Professions = () => {
  return (
    <div>
      <Head>
        <title>Professions</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Layout activePage="Professions">
        <ProfessionsList />
      </Layout>
    </div>
  )
}

Professions.getInitialProps = ({ ctx }) => {
  const  { store } = ctx;

  store.dispatch(actionCreator(actionTypes.PROFESSIONS_INITIAL_STATE, initialState));
  store.dispatch(actionCreator(actionTypes.GET_PROFESSIONS));
}

export default connect()(Professions);
