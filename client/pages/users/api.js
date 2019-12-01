import ApiService from 'shared/api';

class UserApi extends ApiService {
  getUsers = (offset, searchTerm, sort) => {
    return this.get(`/api/users?offset=${offset}&searchTerm=${searchTerm}&sort=${sort}`);
  }

  login = (payload) => {
    return this.post('/auth/login', payload);
  }

  invite = (email = '', role = '') => {
    return this.post('/api/users/invite', { email, role });
  }
}

export default new UserApi();