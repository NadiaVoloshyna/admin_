const { HTTP_HEADERS, LOG_TYPE } = require('../../../common/constants');
const { logger } = require('../../services/gcp/logger');
const createResponseBody = require('./createResponseBody');
const { STATUSES } = require('./constants');

const createErrorPayload = (req, error, [ code, status ]) => {
  const { message, stack } = error;

  return {
    traceId: req.get(HTTP_HEADERS.X_TRACE_ID),
    status,
    code,
    message,
    errorType: LOG_TYPE.API,
    stack,
    url: req.originalUrl,
  };
};

module.exports = (req, res, next) => {
  Object.entries(STATUSES).forEach((item) => {
    const [code, status] = item;

    if (!req[`handle${code}`]) {
      req[`handle${code}`] = (errorOrMessage) => {
        const error = (errorOrMessage instanceof Error)
          ? errorOrMessage
          : new Error(errorOrMessage);

        logger.error(createErrorPayload(req, error, item));

        const responseBody = createResponseBody(error.message, status);
        res.status(code).send(responseBody);
      };
    }
  });

  next();
};
