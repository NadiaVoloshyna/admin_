import React from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import Layout from 'shared/components/layout';
import PersonsList from 'pages/persons/components/personsList';
import { actionTypes, actionCreator } from 'pages/persons/actions';
import { initialState } from 'pages/persons/reducers';

const Persons = () => {
  return (
    <div>
      <Head>
        <title>Persons</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Layout activePage="Persons">
        <div className="card mb-5">
          <div className="card-body d-flex justify-content-end">
            <a className="btn btn-primary" href="/persons/new">Create Post</a>
          </div>
        </div>

        <PersonsList />
      </Layout>
    </div>
  )
}

Persons.getInitialProps = ({ ctx }) => {
  const  { store } = ctx;

  store.dispatch(actionCreator(actionTypes.PERSONS_INITIAL_STATE, initialState));
  store.dispatch(actionCreator(actionTypes.GET_PERSONS));
}

export default connect()(Persons);
