import ApiService from 'shared/api';
import queryString from 'query-string';

class ProfessionsApi extends ApiService {
  getProfessions = (args) => {
    let query = queryString.stringify(args);
    query = query ? `?${query}` : '';
    return this.$http.get(`/api/professions${query}`);
  }

  getAllProfessions = () => {
    return this.$http.get('/api/professions');
  }

  deleteProfessions = (ids) => {
    return this.$http.delete('/api/professions', { data: { ids } });
  }

  create = (payload) => {
    return this.$http.post('/api/professions', payload);
  }
}

export default new ProfessionsApi();
