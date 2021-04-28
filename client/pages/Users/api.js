import ApiService from 'shared/api';
import queryString from 'query-string';

class UsersApi extends ApiService {
  getUsers = (args) => {
    let query = queryString.stringify(args);
    query = query ? `?${query}` : '';
    return this.$http.get(`/api/users${query}`);
  }

  deactivateUser = (ids) => {
    return this.$http.put('/api/users', { ids });
  }

  invite = (email = '', role = '') => {
    return this.$http.post('/api/users/invite', { email, role });
  }

  update = ({ id, ...body }) => {
    return this.$http.put(`/api/users/${id}`, body);
  }
}

export default new UsersApi();
