import fetch from 'isomorphic-unfetch';
import { 
  GET_PERSON, 
  GET_PERSONS,
  CREATE_PERSON, 
  DELETE_PERSONS
} from 'queries/person';

const fetchQuery = (query) => {
  return fetch('http://localhost:3001/graphql', {
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

  getPersons (offset, searchTerm, sort) {
    return fetchQuery(
      GET_PERSONS(offset, searchTerm, sort)
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

  uploadPortrait (file) {
    const data = new FormData();
    data.append('image', file[0]);

    return fetch('http://localhost:3001/images/upload', {
      method: 'POST',
      body: data
    });
  }

  createProfession (name) {
    return fetchQuery(`mutation {
      createProfession(name: "${name}") {
        _id,
        name
      }
    }`)
  }

  getProfessions (offset, searchTerm, sort) {
    return fetchQuery(`{
      professions(offset: ${offset}, searchTerm: "${searchTerm}", sort: "${sort}") {
        professions {
          _id,
          name
        },
        pagination {
          total,
          limit,
          offset
        }
      }
    }`);
  }
}

export default new PersonApi();