const { logger } = require('../../services/gcp/logger');

module.exports = (router) => {
  router.post('/', (req, res) => {
    logger.error(req.body);
    res.status(200).end();
  });
};
