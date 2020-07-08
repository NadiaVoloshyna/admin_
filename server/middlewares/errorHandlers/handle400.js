const { validationResult } = require('express-validator');
const createResponseBody = require('./createResponseBody');

const handle400 = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.array().length) {
    return errors.array().forEach((error => createResponseBody(error.message, 'badRequest')));
  }

  next();
};

module.exports = handle400;
