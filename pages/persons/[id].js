import React from 'react'
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import { Form, Field, useFormState } from 'react-final-form' 
import Head from 'next/head';
import Layout from 'shared/components/layout';

import PersonActions from 'pages/person/components/actions';
import PersonName from 'pages/person/components/name';
import DuplicateModal from 'pages/person/components/duplicateModal';
import PersonPortrait from 'pages/person/components/portrait';
import PersonBiography from 'pages/person/components/biography';
import PersonProfession from 'pages/person/components/profession';
import PersonYears from 'pages/person/components/years';
import { actions as pageActions } from 'pages/person/actions';
import { auth } from 'utils/auth';

import { initialState } from 'pages/person/reducers';

const Person = ({ isNew, toggleIsLoading, toggleActions, createPerson, updatePerson }) => {
  const personState = useSelector(state => state.person);
  
  const { person, pageConfig } = personState;
  const { name, portrait, biography } = person;
  const { disableActions, isLoading } = pageConfig;

  const onSubmit = (values) => {
    toggleIsLoading && toggleIsLoading(true);

    if (isNew) {
      createPerson(values);
    } else {
      updatePerson({
        id: person._id,
        ...values
      });
    }
  }
  
  return (
    <div>
      <Head>
        <title>Post</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Layout activePage="Person" isLoading={isLoading}>
        <Layout.Navbar>
          a
        </Layout.Navbar>

        <Form
          onSubmit={(values) => onSubmit(values)}
          initialValues={{ name }}
          render={({ handleSubmit, form, submitting, pristine, values }) => {

            // if (disableActions !== submitting || pristine) {
            //   console.log('disableActions', disableActions);
            //   console.log('submitting || pristine', submitting || pristine);
            //   console.log('@@@@@@@@@@@@', disableActions !== submitting || pristine);
            //   toggleActions(submitting || pristine);
            // }

            return (
              <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="row">
                  <div className="col-8">
                    <PersonName />
                    <PersonBiography 
                      biography={biography}
                      name={person.name}
                    />
                    <PersonActions disableActions={disableActions} />
                  </div>
                  <div className="col-4">
                    <PersonActions disableActions={disableActions} />
                    <PersonPortrait portrait={portrait} />
                    {/* <PersonYears />
                    <PersonProfession /> */}
                  </div>
                </div>
              </form>
          )}}
        />
      </Layout>

      <DuplicateModal />

      <style jsx global>{`
        .person-page .page-content {
          padding-top: 110px;
        }
      `}</style>
    </div>
  )
}

Person.getInitialProps = ({ ctx }) => {
  auth(ctx);
  const  { query, store, isServer } = ctx;
  
  const isNew = query.id === 'new';

  store.dispatch(pageActions.personInitialState(initialState));
  
  if (!isNew && isServer) {
    store.dispatch(pageActions.getPerson(query.id));
  };

  return { isNew }
}

const mapDispatchToProps = {
  toggleIsLoading: pageActions.toggleIsLoading,
  toggleActions: pageActions.toggleActions,
  createPerson: pageActions.createPerson,
  updatePerson: pageActions.updatePerson
};

export default connect(
  null,
  mapDispatchToProps
)(Person);
