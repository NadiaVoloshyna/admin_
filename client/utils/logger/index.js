import LogApi from 'shared/api/log';
import { LOG_TYPE } from 'common/constants';

const createErrorBody = (error) => ({
  message: error.message,
  stack: error.stack,
  errorType: LOG_TYPE.CLIENT,
});

export const log = (message) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(message);
  }
};

export const error = (error) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(error.message);
  }

  // Api errors will be logged on the server
  if (!error.isAxiosError) {
    LogApi.log(createErrorBody(error));
  }
};

export default {
  log,
  error
};
