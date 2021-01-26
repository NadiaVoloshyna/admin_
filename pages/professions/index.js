import React from 'react';
import Head from 'next/head';
import { number } from 'prop-types';
import ProfessionsPage from 'pages/Professions';
import ProfessionsAPI from 'pages/Professions/api';
import logger from 'utils/logger';
import WithError from 'shared/components/withError';

const Professions = (props) => (
  <WithError statusCode={props.statusCode}>
    <Head>
      <title>Professions</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <ProfessionsPage {...props} />
  </WithError>
);

Professions.getInitialProps = async (ctx) => {
  const { req, query } = ctx;

  try {
    const { data: { docs: professions, limit, total } } = await ProfessionsAPI
      .setCookie(req)
      .getProfessions(query);

    return {
      professions,
      pages: Math.ceil(total / limit),
    };
  } catch (error) {
    logger.error(error);
    return {
      statusCode: (error.response && error.response.status) || 500,
    };
  }
};

Professions.propTypes = {
  statusCode: number,
};

Professions.defaultProps = {
  statusCode: null,
};

export default Professions;
