import React from 'react';
import _unescape from 'lodash/unescape';

import PersonAPI from 'pages/Person/api';
import ProfessionsAPI from 'pages/Professions/api';
import PersonPage from 'pages/Person';
import { personState } from 'pages/Person/state';

const Person = (props) => <PersonPage {...props} />

Person.getInitialProps = async (ctx) => {
  const { query, isServer, req } = ctx;
  let person = personState;
  let professions = {};
  
  if (isServer) {
    const personReq      = PersonAPI.setCookie(req).getPerson(query.id);
    const professionsReq = ProfessionsAPI.getAllProfessions();
    const personRes      = await personReq;
    const professionsRes = await professionsReq;

    if (personRes.status !== 200) return { errorCode: personRes.status };
    if (professionsRes.status !== 200) return { errorCode: professionsRes.status };

    person         = await personRes.json();
    professions    = await professionsRes.json();
  };

  return {
    person,
    professions: professions.professions
  }
}

export default Person;
