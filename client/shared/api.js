import fetch from 'isomorphic-unfetch';

const baseUrl = 'http://localhost:3001';

export default class ApiService {

  static request = (url, method, body, headers = {}) => {
    let requestOptions = {
      method,
      headers: Object.assign({ 'Content-Type': 'application/json' }, headers)
    }

    if (body) {
      requestOptions = {
        ...requestOptions,
        body: typeof body === 'string' ? body : JSON.stringify(body)
      }
    }

    return fetch(baseUrl + url, requestOptions);
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
}