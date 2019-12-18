import fetch from 'isomorphic-unfetch';
import _startsWith from 'lodash/startsWith';

const baseUrl = 'http://localhost:3001';

export default class ApiService {

  static request = (url, method, body, headers = {}) => {
    let requestOptions = {
      method,
    }

    if (headers) {
      requestOptions = {
        ...requestOptions,
        headers: Object.assign({ 'Content-Type': 'application/json' }, headers)
      }
    }

    if (body) {
      requestOptions = {
        ...requestOptions,
        body: typeof body === 'string' ? body : JSON.stringify(body)
      }
    }

    const requestUrl = _startsWith(url, '/api') ? baseUrl + url : url;

    return fetch(requestUrl, requestOptions);
  }

  post = (url, body, headers = {}) => {
    return ApiService.request(url, 'POST', body, headers);
  }

  get = (url, headers = {}) => {
    return ApiService.request(url, 'GET', null, headers);
  }

  put = (url, body, headers = {}) => {
    return ApiService.request(url, 'PUT', body, headers);
  }

  delete = (url, body, headers) => {
    return ApiService.request(url, 'DELETE', body, headers);
  }

  uploadFile = (url, files) => {
    const body = new FormData();
    body.append('file', files[0]);

    return fetch(baseUrl + url, {
      method: 'POST',
      body
    });
  }
}