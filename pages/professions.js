import React from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import Layout from 'shared/components/layout';
import { actionTypes, actions } from 'pages/professions/actions';
import { auth } from 'utils/auth';
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
        <Layout.Navbar>
          Professions
        </Layout.Navbar>

        <Layout.Content>
          <ProfessionsList />
        </Layout.Content>
      </Layout>
    </div>
  )
}

Professions.getInitialProps = ({ ctx }) => {
  auth(ctx);
  const  { store } = ctx;

  store.dispatch(actions.professionsInitialState(initialState));
  store.dispatch(actions.getProfessions());
}

export default connect()(Professions);
