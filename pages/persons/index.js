import React from 'react';
import Head from 'next/head';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { auth } from 'utils/auth';
import Layout from 'shared/components/layout';
import PersonsList from 'pages/persons/components/personsList';
import CreateDropdown from 'shared/components/createDropdown';
import { actions } from 'pages/persons/actions';
import { initialState } from 'pages/persons/reducers';

const Persons = ({ createPerson }) => {
  return (
    <div>
      <Head>
        <title>Persons</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Layout activePage="persons">
        <Layout.Navbar>
          <div className="row">
            <div className="col-10 m-auto">
              <CreateDropdown
                buttonText="Create Person"
                placeholder="Person's name"
                onCreate={createPerson}
              />
            </div>
          </div>
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
  const { store } = ctx;

  store.dispatch(actions.personsInitialState(initialState));
  store.dispatch(actions.getPersons());
}

const mapDispatchToProps = {
  createPerson: actions.createPerson
};

export default connect(
  null,
  mapDispatchToProps
)(Persons);
