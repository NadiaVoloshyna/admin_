import fetch from 'isomorphic-unfetch';
import _startsWith from 'lodash/startsWith';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export default class ApiService {
  static cookie = undefined;

  static request = (url, method, body, headers) => {
    let requestOptions = {
      method,
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        cookie: ApiService.cookie || undefined
      }
    }

    if (headers) {
      requestOptions.headers = {
        ...requestOptions.headers,
        ...headers
      }
    }

    if (body) {
      requestOptions.body = typeof body === 'string' ? body : JSON.stringify(body)
    }

    const requestUrl = _startsWith(url, '/api') ? publicRuntimeConfig.baseUrl + url : url;

    return fetch(requestUrl, requestOptions);
  }

  setCookie = (req) => {
    if (req && req.headers && req.headers.cookie) {
      ApiService.cookie = req.headers.cookie;
    }
    return this;
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

  patch = (url, body, headers = {}) => {
    return ApiService.request(url, 'PATCH', body, headers);
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