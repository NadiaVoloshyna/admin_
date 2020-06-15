import ApiService from 'shared/api';

class UsersApi extends ApiService {
  getUsersByRole = (role) => {
    return this.get(`/api/users/role?role=${role}`);
  }

  changeRole = (id, role) => {
    return this.patch(`/api/users/${id}/role`, { role });
  }
}

export default new UsersApi();