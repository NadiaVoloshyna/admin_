import ApiService from 'shared/api';
import queryString from 'query-string';

class MediaApi extends ApiService {
  getAssets = (args) => {
    let query = queryString.stringify(args);
    query = query ? `?${query}` : '';
    return this.$http.get(`/api/assets${query}`);
  }

  createAsset = (params) => {
    return this.$http.post('/api/assets', params);
  }

  deleteAsset = (id) => {
    return this.$http.delete(`/api/assets/${id}`);
  }

  getBreadcrumbs = (id) => {
    return this.$http.get(`/api/assets/breadcrumbs?id=${id}`);
  }
}

export default new MediaApi();
