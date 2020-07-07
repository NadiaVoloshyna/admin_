import axios from 'axios';
import getConfig from 'next/config';
import { requestInterceptor, responseInterceptor } from './interceptors';

const { publicRuntimeConfig } = getConfig();

const config = {
  credentials: 'same-origin',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
  baseURL: publicRuntimeConfig.baseUrl,
  validateStatus: (status) => {
    return (status >= 200 && status < 300) || status === 302;
  },
};

export default class ApiService {
  constructor() {
    const http = axios.create(config);

    http.interceptors.request.use(requestInterceptor);
    http.interceptors.response.use(null, responseInterceptor);

    this.$http = http;
  }

  setCookie = (req) => {
    if (req && req.headers && req.headers.cookie) {
      this.$http.defaults.headers.cookie = req.headers.cookie;
    }

    return this;
  }
}
