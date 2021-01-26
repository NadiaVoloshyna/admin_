import ApiService from './index';

class FilesApi extends ApiService {
  create = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    return this.$http.post('/api/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

export default new FilesApi();
