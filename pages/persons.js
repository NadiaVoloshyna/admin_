import React from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import Layout from 'components/layout';
import PersonsList from 'components/pages/persons/personsList';
import { actionTypes, actionCreator } from 'actions/person';
import { initialState } from '../store/reducers/persons';

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
