import React from 'react';
import { number } from 'prop-types';
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
  const { req, query } = ctx;

  try {
    const { data: { docs: persons, limit, total } } = await PersonsApi
      .setCookie(req)
      .getPersons(query);

    return {
      persons,
      pages: Math.ceil(total / limit),
    };
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
