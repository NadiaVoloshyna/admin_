import ApiService from 'shared/api';

class UserApi extends ApiService {
  login = (payload) => {
    return this.post('/auth/login', payload);
  }

  register = (payload) => {
    return this.post('/auth/register', payload);
  }

  invite = (email = '', role = '') => {
    return this.post('/api/users/invite', { email, role });
  }
}

export default new UserApi();
