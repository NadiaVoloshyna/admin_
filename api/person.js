import fetch from 'isomorphic-unfetch';

const fetchQuery = (query) => {
  return fetch('http://localhost:3001/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });
}

class PersonApi {
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