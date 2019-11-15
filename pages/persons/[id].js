import React from 'react'
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router'
import { Form, Field, useFormState } from 'react-final-form'
import Head from 'next/head';
import Router from 'next/router';
import Layout from 'shared/components/layout';

import PersonActions from 'pages/person/components/actions';
import PersonName from 'pages/person/components/name';
import DuplicateModal from 'pages/person/components/duplicateModal';
import PersonPortrait from 'pages/person/components/portrait';
import PersonBiography from 'pages/person/components/biography';
import PersonProfession from 'pages/person/components/profession';
import PersonYears from 'pages/person/components/years';
import { actionTypes, actionCreator } from 'pages/person/actions';

import { initialState } from 'pages/person/reducers';

const onSubmit = (dispatch, values, isNew, person) => {
  dispatch(actionCreator(actionTypes.TOGGLE_IS_LOADING, true));

  const createOrUpdatePerson = (payload) => dispatch({
    type: isNew ? 'CREATE_PERSON': 'UPDATE_PERSON',
    payload
  });

  createOrUpdatePerson({
    ...person,
    name: values.name
  });
}

const usePage = () => {
  const dispatch = useDispatch();

  const personState = useSelector(state => state.person);

  const toggleActions = (payload) => dispatch({
    type: 'TOGGLE_ACTIONS',
    payload
  });

  return { 
    personState, 
    toggleActions,
  };
}

const Person = ({ isNew }) => {
  const dispatch = useDispatch();
  const router = useRouter()

  const { personState, toggleActions } = usePage();
  const { person, pageConfig, isPersonCreated } = personState;

  const { name, portrait, biography } = person;
  const { disableActions, isLoading } = pageConfig;

  if (isNew && isPersonCreated) {
    router.push(`/persons/${person._id}`);
  }
  
  return (
    <div>
      <Head>
        <title>Post</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Layout activePage="Person" isLoading={isLoading}>
        <Form
          onSubmit={(values) => onSubmit(dispatch, values, isNew, person)}
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
  const  { query, store, isServer } = ctx;
  
  const isNew = query.id === 'new';

  store.dispatch({
    type: 'PERSON_INITIAL_STATE',
    payload: initialState
  })
  
  if (!isNew && isServer) {
    store.dispatch({
      type: 'GET_PERSON',
      payload: query.id
    });
  };

  return { isNew }
}

export default connect()(Person);
