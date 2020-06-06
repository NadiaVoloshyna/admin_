import React from 'react';
import { paginationState } from 'shared/reducers/pagination';
import PersonsApi from 'pages/Persons/api';
import PersonsPage from 'pages/Persons';

const Persons = (props) => <PersonsPage {...props} />

Persons.getInitialProps = async (ctx) => {
  const { req } = ctx;
  const { offset, searchTerm, sort } = paginationState();

  try {
    // sharedActions.toggleIsLoading();
    const { persons, pagination } = await PersonsApi
    .setCookie(req)
    .getPersons(offset, searchTerm, sort);
    
    return { persons, pagination: { offset, searchTerm, sort, ...pagination } };
  } catch (error) {
    console.error(error);
  } finally {
    // sharedActions.toggleIsLoading();
  }
};

export default Persons;
