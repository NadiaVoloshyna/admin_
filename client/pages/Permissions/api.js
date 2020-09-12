import ApiService from 'shared/api';

class PermissionsApi extends ApiService {
  getPermissions = () => {
    return this.$http.get('/api/permissions');
  }

  createPermissions = (params) => {
    return this.$http.post('/api/permissions', params);
  }

  updatePermission = (id, updates) => {
    return this.$http.put(`/api/permissions/${id}`, updates);
  }

  deletePermission = (id) => {
    return this.$http.delete(`/api/permissions/${id}`);
  }
}

export default new PermissionsApi();
