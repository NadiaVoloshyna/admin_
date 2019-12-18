import ApiService from 'shared/api';

class ProfessionsApi extends ApiService {
  getProfessions = (offset, searchTerm, sort) => {
    return this.get(`/api/professions?offset=${offset}&searchTerm=${searchTerm}&sort=${sort}`);
  }

  create = (payload) => {
    return this.post('/api/professions', payload);
  }
}

export default new ProfessionsApi();