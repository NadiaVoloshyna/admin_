const chalk = require('chalk');

const severityColor = (level) => {
  const severity = level.toUpperCase();

  switch (level) {
    case 'error':
      return chalk.red(`${severity}: `);
    case 'warn':
      return chalk.yellow(`${severity}: `);
    case 'info':
      return chalk.green(`${severity}: `);
    default:
      return chalk.gray(`${severity}: `);
  }
};

const createError = (meta) => {
  const { level, message } = meta;
  const stringifiedLog = JSON.stringify(meta, Object.getOwnPropertyNames(meta));

  return severityColor(level)
        + message
        + chalk.gray(`\n \u21AA ${stringifiedLog}`);
};

const createWarning = ({ level, message }) => {
  return severityColor(level) + message;
};

const createLog = (args) => {
  const { level } = args;
  if (level === 'error') {
    return createError(args);
  }

  if (level === 'info') {
    return createWarning(args);
  }
};

module.exports = createLog;
