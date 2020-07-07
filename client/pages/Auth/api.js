import ApiService from 'shared/api';

class AuthApi extends ApiService {
  login = (payload) => {
    return this.$http.post('/auth/login', payload);
  }

  register = (payload) => {
    return this.$http.post('/auth/register', payload);
  }
}

export default new AuthApi();
