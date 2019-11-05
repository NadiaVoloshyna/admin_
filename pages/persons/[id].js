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

//import PersonsPortraits from 'components/pages/post/portraits';
//import PersonsBiography from 'components/pages/post/biography';

const onSubmit = (dispatch, values, isNew) => {
  const createOrUpdatePerson = (payload) => dispatch({
    type: isNew ? 'CREATE_PERSON': 'UPDATE_PERSON',
    payload
  });

  createOrUpdatePerson({
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

  const { name, portraits } = person;
  const { disableActions } = pageConfig;
  const { primary, socondary } = portraits;

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
          onSubmit={(values) => onSubmit(dispatch, values, isNew)}
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
                    {/* <PersonsPortraits portraits={person.portraits} /> */}
                    {/* <PersonsBiography biography={person.biography} /> */}

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
                    <div className="card">
                      <div className="card-body">
                        
                      </div>
                    </div>
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
