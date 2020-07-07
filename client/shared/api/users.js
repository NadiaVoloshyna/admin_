import ApiService from 'shared/api';

class UsersApi extends ApiService {
  getUsersByRole = (role) => {
    return this.$http.get(`/api/users/role?role=${role}`);
  }

  changeRole = (id, role) => {
    return this.$http.patch(`/api/users/${id}/role`, { role });
  }
}

export default new UsersApi();
