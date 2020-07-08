import { v4 as uuidv4 } from 'uuid';
import { HTTP_HEADERS } from 'common/constants';

export function requestInterceptor(config) {
  config.headers[HTTP_HEADERS.X_TRACE_ID] = uuidv4();
  return config;
}

export function responseInterceptor(error) {
  // TODO: think if you need logging here
  return Promise.reject(error);
}
