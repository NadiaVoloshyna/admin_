import React from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import { auth } from 'utils/auth';
import Layout from 'shared/components/layout';
import PersonsList from 'pages/persons/components/personsList';
import { actions } from 'pages/persons/actions';
import { initialState } from 'pages/persons/reducers';

const Persons = () => {
  return (
    <div>
      <Head>
        <title>Persons</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Layout activePage="Persons">
        <Layout.Navbar>
          <a className="btn btn-primary" href="/persons/new">Create Post</a>
        </Layout.Navbar>

        <Layout.Content>
          <PersonsList />
        </Layout.Content>
      </Layout>
    </div>
  )
}

Persons.getInitialProps = ({ ctx }) => {
  auth(ctx);
  const  { store } = ctx;

  store.dispatch(actions.personsInitialState(initialState));
  store.dispatch(actions.getPersons());
}

export default connect()(Persons);
