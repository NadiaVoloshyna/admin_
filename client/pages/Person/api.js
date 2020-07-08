import ApiService from 'shared/api';

class PersonApi extends ApiService {
  getPerson = (id) => {
    return this.$http.get(`/api/persons/${id}`);
  }

  update = (id, payload) => {
    return this.$http.put(`/api/persons/${id}`, payload);
  }

  updateStatus = (id, status) => {
    return this.$http.put(`/api/persons/${id}/status`, { status });
  }

  updatePermissions = (id, users) => {
    return this.$http.post(`/api/persons/${id}/permissions`, { users });
  }
}

export default new PersonApi();
