const _snakeCase = require('lodash/snakeCase');
const { validationResult } = require('express-validator');
const { logger } = require('../loggers');

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  
  if (errors.array().length) {
    logger.error(errors.array());
    
    res.status(400).send({
      error: {
        code: 'BAD_REQUEST',
        details: errors.array().map(item => ({ 
          code: _snakeCase(item.msg).toUpperCase(), 
          message: `${item.msg} ${item.param} in ${item.location}` 
        }))
      }
    });
    return;
  }

  next();
}