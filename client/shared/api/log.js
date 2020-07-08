import ApiService from 'shared/api';

class LogApi extends ApiService {
  log = (params) => {
    return this.$http.post('/api/__log__', params);
  };
}

export default new LogApi();
