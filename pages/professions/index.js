import React from 'react';
import ProfessionsPage from 'pages/Professions';
import ProfessionsAPI from 'pages/Professions/api';
import { professionsState } from 'pages/Professions/state';
import { paginationState } from 'shared/state';
import logger from 'utils/logger';
import WithError from 'shared/components/withError';

const Professions = (props) => (
  <WithError statusCode={props.statusCode}>
    <ProfessionsPage {...props} />
  </WithError>
);

Professions.getInitialProps = async (ctx) => {
  const { req } = ctx;
  const { offset, searchTerm, sort } = paginationState;

  try {
    let { data: { pagination, professions } } = await
    ProfessionsAPI.setCookie(req).getProfessions(offset, searchTerm, sort);

    professions = professions || professionsState.professions;
    pagination = { offset, searchTerm, sort, ...pagination };

    return { professions, pagination };
  } catch (error) {
    logger.error(error);
    return {
      statusCode: (error.response && error.response.status) || 500
    };
  }
};

export default Professions;
