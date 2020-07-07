import ApiService from 'shared/api';

class ProfessionsApi extends ApiService {
  getProfessions = (offset, searchTerm, sort) => {
    return this.$http.get(`/api/professions?offset=${offset}&searchTerm=${searchTerm}&sort=${sort}`);
  }

  getAllProfessions = () => {
    return this.$http.get('/api/professions');
  }

  deleteProfessions = (ids) => {
    return this.$http.delete('/api/professions', { ids });
  }

  create = (payload) => {
    return this.$http.post('/api/professions', payload);
  }
}

export default new ProfessionsApi();
