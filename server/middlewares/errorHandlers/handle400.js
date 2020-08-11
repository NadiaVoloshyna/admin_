const { validationResult } = require('express-validator');
const createResponseBody = require('./createResponseBody');

const handle400 = (req, res, next) => {
  const errors = validationResult(req).formatWith(({ location, msg, param }) => {
    return `${msg} in param '${param}' located in '${location}'`;
  });

  // TODO: log errors

  if (errors.array().length) {
    const responseBody = createResponseBody(errors.array(), 'badRequest');
    return res.status(400).send(responseBody);
  }

  next();
};

module.exports = handle400;
