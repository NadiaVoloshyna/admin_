import React from 'react'
import { connect, useSelector } from 'react-redux';
import { Form, Field, useFormState } from 'react-final-form' 
import Head from 'next/head';
import Layout from 'shared/components/layout';

import PersonActions from 'pages/person/components/actions';
import PersonName from 'pages/person/components/name';
import DuplicateModal from 'pages/person/components/duplicateModal';
import PersonPortrait from 'pages/person/components/portrait';
import PersonBiography from 'pages/person/components/biography';
import PersonProfession from 'pages/person/components/profession';
import ProfessionSection from 'pages/person/components/professionSection';
import PersonYears from 'pages/person/components/years';
import { actions as pageActions } from 'pages/person/actions';
import { auth } from 'utils/auth';

import { initialState } from 'pages/person/reducers';

const Person = ({ toggleIsLoading, toggleActions, updatePerson }) => {
  const personState = useSelector(state => state.person);
  
  const { person, pageConfig } = personState;
  const { name, portrait, biography, professions } = person;
  const { disableActions, isLoading } = pageConfig;

  const onSubmit = (values) => {
    toggleIsLoading && toggleIsLoading(true);

    updatePerson({
      id: person._id,
      ...values
    });
  }
  
  return (
    <div>
      <Head>
        <title>Post</title>
        <link rel='icon' href='/favicon.ico' />
        <script src="https://media-library.cloudinary.com/global/all.js" defer></script>
      </Head>

      <Layout activePage="Person" isLoading={isLoading}>
        <Layout.Navbar className="d-flex justify-content-between">
          <div className="row">
            <div className="col">Person</div>
            <div className="col text-right">
              <PersonActions disableActions={disableActions} />
            </div>
          </div>
        </Layout.Navbar>

        <Layout.Content maxWidth className="col-12">
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
                      <ProfessionSection professions={professions} />
                    </div>
                    <div className="col-4">
                      <PersonPortrait portrait={portrait} name={name} />
                      <PersonYears />
                      <PersonProfession professions={professions} />
                    </div>
                  </div>
                </form>
            )}}
          />
        </Layout.Content>
      </Layout>

      <DuplicateModal />
    </div>
  )
}

Person.getInitialProps = ({ ctx }) => {
  auth(ctx);
  const { query, store, isServer } = ctx;

  store.dispatch(pageActions.personInitialState(initialState));
  
  if (isServer) {
    store.dispatch(pageActions.getPerson(query.id));
  };
}

const mapDispatchToProps = {
  toggleIsLoading: pageActions.toggleIsLoading,
  toggleActions: pageActions.toggleActions,
  updatePerson: pageActions.updatePerson
};

export default connect(
  null,
  mapDispatchToProps
)(Person);
