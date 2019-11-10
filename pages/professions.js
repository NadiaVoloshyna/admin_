import React from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import Layout from 'shared/components/layout';
import { actionTypes, actionCreator } from 'pages/professions/actions';
import { initialState } from 'pages/professions/reducers';
import ProfessionsList from 'pages/professions/components/professionsList';

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
