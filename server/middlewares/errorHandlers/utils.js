const { HTTP_HEADERS, LOG_TYPE } = require('../../../common/constants');
const { logger } = require('../../services/gcp/logger');

module.exports.createErrorPayload = (req, error, [ code, status ]) => {
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

module.exports.createResponseBody = (message, code) => {
  if (typeof message === 'undefined') {
    logger.error('[message] argument is required in createResponseBody');
    return process.exit(1);
  }

  if (typeof code === 'undefined') {
    logger.error('[code] argument is required in createResponseBody');
    return process.exit(1);
  }

  const messages = Array.isArray(message) ? message : [message];

  return {
    error: {
      code,
      details: messages.map(message => ({
        code,
        message,
      })),
    },
  };
};
