import ApiService from 'shared/api';

class PersonsApi extends ApiService {
  getPersons = (offset, searchTerm, sort) => {
    return this.get(`/api/persons?offset=${offset}&searchTerm=${searchTerm}&sort=${sort}`);
  }

  deletePersons = (ids, documentIds) => {
    return this.delete('/api/persons', { ids, documentIds });
  }

  create = (name) => {
    return this.post('/api/persons', name);
  }
}

export default new PersonsApi();