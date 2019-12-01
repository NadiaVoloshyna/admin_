const pino = require('pino');

const logger = pino({
  level: process.env.DEBUG === true ? 'debug' : 'info'
});

module.exports = {
  logger
}