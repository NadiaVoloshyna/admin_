import React from 'react'
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router'
import { Form, Field, useFormState } from 'react-final-form'
import Head from 'next/head';
import Router from 'next/router';
import Layout from 'components/layout';
import PostNavbar from 'components/pages/post/navbar';
import PersonsName from 'components/pages/post/name';
import DuplicateModal from 'components/pages/person/duplicateModal';
import { initialState } from '../../store/reducers/person';

import PersonsPortrait from 'components/pages/person/portrait';
import PersonsBiography from 'components/pages/person/biography';

const onSubmit = (dispatch, values, isNew, person) => {
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
  const { disableActions } = pageConfig;

  if (isNew && isPersonCreated) {
    router.push(`/persons/${person._id}`);
  }
  
  return (
    <div>
      <Head>
        <title>Post</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Layout activePage="Posts">
        <PostNavbar disableActions={disableActions} />
        
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
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-8">
                    <PersonsName />
                    <PersonsBiography biography={biography} />

                    <div className="d-flex justify-content-end">
                      <button 
                        type="submit" 
                        disabled={submitting || pristine}
                        className="btn btn-success"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                  <div className="col-4">
                    <PersonsPortrait portrait={portrait} />
                  </div>
                </div>
              </form>
          )}}
        />
      </Layout>

      <DuplicateModal />

      <style jsx>{`
        .file-upload-container {
          height: 260px;
          width: 200px;
          min-width: 200px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  )
}

Person.getInitialProps = ({ ctx }) => {
  const  { query, store } = ctx;
  const isNew = query.id === 'new';

  store.dispatch({
    type: 'PERSON_INITIAL_STATE',
    payload: initialState
  })
  
  if (!isNew) {
    store.dispatch({
      type: 'GET_PERSON',
      payload: query.id
    });
  };

  return { isNew }
}

export default connect()(Person);
