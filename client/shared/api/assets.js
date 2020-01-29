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

  moveAsset = (assetId, parentId) => {
    return this.put(`/api/assets/${assetId}`, {
      action: 'move',
      payload: {
        parentId
      }
    });
  }
}

export default new MediaApi();