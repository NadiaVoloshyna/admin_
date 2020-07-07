import ApiService from 'shared/api';

class PersonsApi extends ApiService {
  getPersons = (offset, searchTerm, sort) => {
    return this.$http.get(`/api/persons?offset=${offset}&searchTerm=${searchTerm}&sort=${sort}`);
  }

  deletePersons = (ids) => {
    return this.$http.delete('/api/persons', { ids });
  }

  create = (name) => {
    return this.$http.post('/api/persons', name);
  }
}

export default new PersonsApi();
