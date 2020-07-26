import React from 'react';
import { number } from 'prop-types';
import { paginationState } from 'shared/state';
import PersonsApi from 'pages/Persons/api';
import PersonsPage from 'pages/Persons';
import WithError from 'shared/components/withError';
import logger from 'utils/logger';

const Persons = (props) => (
  <WithError statusCode={props.statusCode}>
    <PersonsPage {...props} />
  </WithError>
);

Persons.getInitialProps = async (ctx) => {
  const { req } = ctx;
  const { offset, searchTerm, sort } = paginationState;

  try {
    const { data: { persons, pagination } } = await PersonsApi
      .setCookie(req)
      .getPersons(offset, searchTerm, sort);

    return { persons, pagination: { offset, searchTerm, sort, ...pagination } };
  } catch (error) {
    logger.error(error);
    return {
      statusCode: (error.response && error.response.status) || 500
    };
  }
};

Persons.propTypes = {
  statusCode: number
};

Persons.defaultProps = {
  statusCode: null
};

export default Persons;
