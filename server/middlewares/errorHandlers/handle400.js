const { validationResult } = require('express-validator');
const { createResponseBody, createErrorPayload } = require('./utils');
const { logger } = require('../../services/gcp/logger');

const handle400 = (req, res, next) => {
  const errors = validationResult(req).formatWith(({ location, msg, param }) => {
    return `${msg} in param '${param}' located in '${location}'`;
  });

  if (errors.array().length) {
    const errorToLog = createErrorPayload(
      req,
      JSON.stringify(errors.array()),
      [400, 'badRequest'],
    );

    logger.error(errorToLog);

    const responseBody = createResponseBody(errors.array(), 'badRequest');
    return res.status(400).send(responseBody);
  }

  next();
};

module.exports = handle400;
