const _snakeCase = require('lodash/snakeCase');
const { logger } = require('../loggers');

const statuses = {
  '401': 'Unauthorized',
  '403': 'Forbidden'
}

const validation = (res, status, errors) => {
  res.status(status).send({
    error: {
      code: 'INVALID_REQUEST',
      details: errors.array().map(item => ({ 
        code: _snakeCase(item.msg).toUpperCase(), 
        message: `${item.msg} ${item.param} in ${item.location}` 
      }))
    }
  });
}

const custom = (res, status, error) => {
  const code = statuses[status + ''];
  let message = error;

  if (error instanceof Error) {
    message = error.message;
  }

  logger.error(message);

  res.status(status).send({
    error: {
      code: _snakeCase(code).toUpperCase(),
      details: [{ 
        code: _snakeCase(code).toUpperCase(), 
        message 
      }]
    }
  });
}

module.exports = {
  validation,
  custom
}