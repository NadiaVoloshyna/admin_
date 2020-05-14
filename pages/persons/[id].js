import React from 'react';
import { connect } from 'react-redux';
import _unescape from 'lodash/unescape';

import PersonAPI from 'pages/person/api';
import ProfessionsAPI from 'pages/professions/api';
import { actions as pageActions } from 'pages/person/actions';
import PersonPage from 'pages/Person';

const Person = (props) => <PersonPage {...props} />

Person.getInitialProps = async (ctx) => {
  const { query, store, isServer, req } = ctx;
  let person = {};
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

    store.dispatch(pageActions.getPersonSuccess(person));
  };

  return {
    person,
    professions: professions.professions
  }
}

const mapDispatchToProps = {
  updatePerson: pageActions.updatePerson
};

export default connect(null, mapDispatchToProps)(Person);
