import React from 'react';
import ProfessionsPage from 'pages/Professions';
import ProfessionsAPI from 'pages/Professions/api';
import { professionsState } from 'pages/Professions/state';
// import { paginationState } from 'shared/paginationState/index';
const paginationState = {offset: 0, searchTerm: '', sort: 'ascending'};

const Professions = (props) => <ProfessionsPage {...props} />

Professions.getInitialProps = async (ctx) => {
  const { req } = ctx;
  let { professions } = professionsState;
  let pagination = paginationState;
  const { offset, searchTerm, sort } = pagination;
  
  try {
    const professionsReq = ProfessionsAPI.setCookie(req).getProfessions(offset, searchTerm, sort);
    const professionsRes = await professionsReq;
    const response = await professionsRes.json();
    
    if (professionsRes.status !== 200) return { errorCode: professionsRes.status };

    professions = response.professions;
    pagination = { ...pagination, ...response.pagination };
  } catch (error) {
    console.error(error);
  }
  
  return { professions, pagination };
}

export default Professions;
