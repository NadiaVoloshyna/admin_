import ApiService from 'shared/api';

class PersonsApi extends ApiService {
  getPersons = (offset, searchTerm, sort) => {
    return this.get(`/api/persons?offset=${offset}&searchTerm=${searchTerm}&sort=${sort}`)
      .then(res => res.json())
      .catch(error => {
        throw new Error(error);
      });
  }

  deletePersons = (ids) => {
    return this.delete('/api/persons', { ids });
  }

  create = (name) => {
    return this.post('/api/persons', name);
  }
}

export default new PersonsApi();