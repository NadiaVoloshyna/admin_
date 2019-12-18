import ApiService from 'shared/api';

class PersonApi extends ApiService {
  getPerson = (id) => {
    return this.get(`/api/persons/${id}`);
  }

  update = (payload) => {
    return this.put(`/api/persons/${payload.id}`, payload);
  }

  upload = (files) => {
    return this.uploadFile('/api/images', files);
  }
}

export default new PersonApi();