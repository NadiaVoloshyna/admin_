import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'pages/Persons/actions';
import { initialState } from 'pages/Persons/reducers';
import PersonApi from 'pages/Persons/api';
import PersonsPage from 'pages/Persons';

const Persons = (props) => <PersonsPage {...props} />

Persons.getInitialProps = async (ctx) => {
  const { store, req } = ctx;

  store.dispatch(actions.personsInitialState(initialState));
  console.log('personsInitialState', initialState);

  try {
    // sharedActions.toggleIsLoading();
    const { pagination: { offset, searchTerm, sort } } = initialState;
    const persons = await PersonApi
      .setCookie(req)
      .getPersons(offset, searchTerm, sort);

    await store.dispatch(actions.getPersonsSuccess(persons));
  } catch (error) {
    await store.dispatch(actions.getPersonsFail(error));
  } finally {
    // sharedActions.toggleIsLoading();
  }
}

export default connect()(Persons);
