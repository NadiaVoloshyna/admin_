const personActivity = (user, document, updates) => {
  const { $set: fields } = updates;
  const keys = Object.keys(fields);

  const getDifferences = () => {
    const diffs = keys.map(key => ({
      key,
      from: document[key],
      to: fields[key],
    }));

    return JSON.stringify(diffs);
  };

  return {
    message: `${user.fullName} <b>updated</b> person's ${keys.join(', ')}`,
    content: getDifferences(),
  };
};

/**
 * Creates activity for different update routes
 * @param {Object} options Query options
 * @param {Object} document Document before update
 * @param {Object} updates Query updates
 */
exports.createActivity = (options, document, updates) => {
  const { hookMeta = {} } = options;
  const { user, route, oldStatus, newStatus } = hookMeta;

  switch (route) {
    case '/:id':
      return personActivity(user, document, updates);

    case '/:id/status':
      return {
        message: `${user.fullName} <b>changed status</b> from ${oldStatus} to ${newStatus}`,
      };

    default:
      return {};
  }
};
