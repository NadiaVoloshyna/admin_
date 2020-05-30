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

  updateStatus = (id, status) => {
    return this.put(`/api/persons/${id}/status`, { status });
  }

  updatePermissions = (id, users) => {
    return this.post(`/api/persons/${id}/permissions`, { users });
  }
}

export default new PersonApi();