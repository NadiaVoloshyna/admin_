import ApiService from 'shared/api';

class UserApi extends ApiService {
  getUser = (id) => {
    return this.$http.get(`/api/users/${id}`);
  }

  update = (id, params) => {
    return this.$http.put(`/api/users/${id}`, params);
  }
}

export default new UserApi();
