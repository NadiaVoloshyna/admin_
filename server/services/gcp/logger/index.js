const winston = require('winston');
const expressWinston = require('express-winston');
const { LoggingWinston } = require('@google-cloud/logging-winston');
const createLog = require('./utils');

const loggingWinston = new LoggingWinston();

// Create a Winston logger that streams to Stackdriver Logging
// Logs will be written to: "projects/YOUR_PROJECT_ID/logs/winston_log"
const loggingConfig = {
  level: 'info',
  transports: [
    new winston.transports.Console(),
  ],
  meta: true,
  expressFormat: true,
  colorize: true,
  format: winston.format.combine(
    winston.format.printf(createLog),
  )
};

if (process.env.NODE_ENV === 'production') {
  loggingConfig.transports.push(loggingWinston);
}

const logger = winston.createLogger(loggingConfig);
const auditLogger = expressWinston.logger(loggingConfig);

module.exports = {
  logger,
  auditLogger
};
