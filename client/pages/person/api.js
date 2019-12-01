import ApiService from 'shared/api';

class PersonApi extends ApiService {
  getPerson = (id) => {
    return this.get(`/api/persons/${id}`);
  }

  create = (payload) => {
    return this.post('/api/persons', payload);
  }

  update = (payload) => {
    return this.put(`/api/persons/${payload.id}`, payload);
  }

  uploadPortrait = () => {
    
  }
}

export default new PersonApi();