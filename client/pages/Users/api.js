import ApiService from 'shared/api';

class UsersApi extends ApiService {
  getUsers = (offset, searchTerm, sort) => {
    return this.$http.get(`/api/users?offset=${offset}&searchTerm=${searchTerm}&sort=${sort}`);
  }

  invite = (email = '', role = '') => {
    return this.$http.post('/api/users/invite', { email, role });
  }

  update = ({ id, ...body }) => {
    return this.$http.put(`/api/users/${id}`, body);
  }
}

export default new UsersApi();
