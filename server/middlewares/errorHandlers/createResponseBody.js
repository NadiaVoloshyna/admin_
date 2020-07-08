const { logger } = require('../../services/gcp/logger');

module.exports = (message, code) => {
  if (typeof message === 'undefined') {
    logger.error('[message] argument is required in createResponseBody');
    return process.exit(1);
  }

  if (typeof code === 'undefined') {
    logger.error('[code] argument is required in createResponseBody');
    return process.exit(1);
  }

  return {
    error: {
      code,
      details: [{
        code,
        message
      }]
    }
  };
};
