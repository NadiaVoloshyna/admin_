const { logger } = require('../../services/gcp/logger');
const { createResponseBody, createErrorPayload } = require('./utils');
const { STATUSES } = require('./constants');

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
