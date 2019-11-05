import fetch from 'isomorphic-unfetch';
import { GET_PERSON, GET_PERSONS, CREATE_PERSON, DELETE_PERSONS } from 'queries/person';

const fetchQuery = (query) => {
  return fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });
}

class PersonApi {
  getPerson (personId) {
    return fetchQuery(
      GET_PERSON(personId)
    );
  }

  getPersons () {
    return fetchQuery(
      GET_PERSONS()
    );
  }

  createPerson (payload) {
    return fetchQuery(
      CREATE_PERSON(payload)
    );
  }

  deletePersons (ids = []) {
    return fetchQuery(
      DELETE_PERSONS(ids)
    );
  }
}

export default new PersonApi();