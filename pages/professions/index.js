import React from 'react';
import ProfessionsPage from 'pages/Professions';
import ProfessionsAPI from 'pages/Professions/api';
import { professionsState } from 'pages/Professions/state';
import { paginationState } from 'shared/state';

const Professions = (props) => <ProfessionsPage {...props} />;

Professions.getInitialProps = async (ctx) => {
  const { req } = ctx;
  const { offset, searchTerm, sort } = paginationState;

  try {
    const professionsRes = await ProfessionsAPI.setCookie(req).getProfessions(offset, searchTerm, sort);
    let { pagination, professions } = await professionsRes.json();

    if (professionsRes.status !== 200) return { errorCode: professionsRes.status };

    professions = professions || professionsState.professions;
    pagination = { offset, searchTerm, sort, ...pagination };

    return { professions, pagination };
  } catch (error) {
    console.error(error);
  }
};

export default Professions;
