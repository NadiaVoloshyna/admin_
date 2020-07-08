import ApiService from 'shared/api';

class MediaApi extends ApiService {
  getAssets = (id = '') => {
    const query = id ? `?parent=${id}` : '';
    return this.$http.get(`/api/assets${query}`);
  }

  createAsset = (params) => {
    return this.$http.post('/api/assets', params);
  }

  deleteAsset = (id) => {
    return this.$http.delete(`/api/assets/${id}`);
  }
}

export default new MediaApi();
