import ApiService from 'shared/api';

class UsersApi extends ApiService {
  getUsers = (offset, searchTerm, sort) => {
    return this.get(`/api/users?offset=${offset}&searchTerm=${searchTerm}&sort=${sort}`);
  }

  invite = (email = '', role = '') => {
    return this.post('/api/users/invite', { email, role });
  }

  update = ({ id, ...body }) => {
    return this.put(`/api/users/${id}`, body);
  }
}

export default new UsersApi();
