import ApiService from './api';

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

  moveAsset = (assetId, parentId) => {
    return this.$http.put(`/api/assets/${assetId}`, {
      action: 'move',
      payload: {
        parentId
      }
    });
  }
}

export default new MediaApi();
