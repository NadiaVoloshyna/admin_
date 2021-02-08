const { validationResult } = require('express-validator');
const createResponseBody = require('./createResponseBody');
const { logger } = require('../../services/gcp/logger');
const { HTTP_HEADERS, LOG_TYPE } = require('../../../common/constants');

const createErrorPayload = (req, message, code, status) => {
  return {
    traceId: req.get(HTTP_HEADERS.X_TRACE_ID),
    status,
    code,
    message,
    errorType: LOG_TYPE.API,
    url: req.originalUrl,
  };
};

const handle400 = (req, res, next) => {
  const errors = validationResult(req).formatWith(({ location, msg, param }) => {
    return `${msg} in param '${param}' located in '${location}'`;
  });

  // TODO: log errors

  if (errors.array().length) {
    logger.error(createErrorPayload(req, JSON.stringify(errors.array()), 400, 'badRequest'));
    const responseBody = createResponseBody(errors.array(), 'badRequest');
    return res.status(400).send(responseBody);
  }

  next();
};

module.exports = handle400;
