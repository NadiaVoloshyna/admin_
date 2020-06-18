import ApiService from 'shared/api';

class MediaApi extends ApiService {
  getAssets = (id = '') => {
    const query = id ? `?parent=${id}` : '';
    return this.get(`/api/assets${query}`);
  }

  createAsset = (params) => {
    return this.post('/api/assets', params);
  }

  deleteAsset = (id) => {
    return this.delete(`/api/assets/${id}`);
  }
}

export default new MediaApi();
