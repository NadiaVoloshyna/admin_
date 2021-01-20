import ApiService from 'shared/api';

class UserApi extends ApiService {
  getUser = (id) => {
    return this.$http.get(`/api/users/${id}`);
  }
}

export default new UserApi();
