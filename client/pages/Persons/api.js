import ApiService from 'shared/api';
import queryString from 'query-string';

class PersonsApi extends ApiService {
  getPersons = (args) => {
    let query = queryString.stringify(args);
    query = query ? `?${query}` : '';
    return this.$http.get(`/api/persons${query}`);
  }

  deletePersons = (ids) => {
    return this.$http.delete('/api/persons', { data: { ids } });
  }

  create = (name) => {
    return this.$http.post('/api/persons', name);
  }
}

export default new PersonsApi();
