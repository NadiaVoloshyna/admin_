/**
 * Replace all the keys of `replacements` in `original` with their values
 *
 * @param {string} original - the original string to make the replacements within
 * @param {Object} [replacements] - an object where the keys are strings to be replaced,
 *                                  and the values are what they should be replaced with
 * @returns {String}
 */
exports.insertReplacements = (original, replacements) => {
  if (!original || typeof original !== 'string' || !replacements) {
    return original;
  }
  return Object.keys(replacements).reduce((acc, key) => {
    // Only replace key with brackets around it
    const pattern = RegExp(`\\[${key}\\]`, 'g');
    return acc.replace(pattern, replacements[key]);
  }, original);
};

/**
 *
 * @param {Object} asset
 * @returns {String}
 */
exports.encodePortrait = (asset) => {
  return `${asset.url}|${asset._id}`;
};

/**
 *
 * @param {String} portrait
 * @returns {Object}
 */
exports.decodePortrait = (portrait) => {
  const [url, _id] = portrait.split('|');
  return { url, _id };
};

/**
 * Converts raw permissions into permission functions based on the action
 * @param {Array[{
 *  resource: String,
 *  action: String,
 *  role: String,
 *  attributes: Array
 * }]} permissions raw permissions
 * @returns {Object} permision functions. E.g create, update, delete, etc.
 */
exports.createPermissions = (permissions) => {
  if (!permissions) return {};

  const actions = permissions.reduce((acc, next) => {
    if (!acc.includes(next.action)) {
      acc.push(next.action);
    }
    return acc;
  }, []);

  return actions.reduce((acc, action) => {
    if (!acc[action]) {
      acc[action] = (resource, attribute) => {
        if (!resource || typeof resource !== 'string') {
          throw new Error('resource argument is required');
        }

        if (attribute && typeof attribute !== 'string') {
          throw new Error('attribute argument must be of type string');
        }

        const permission = permissions.find(item => item.resource === resource && item.action === action);
        const hasAttribute = !attribute || (permission.attributes && permission.attributes.includes(attribute));
        return permission.permitted && hasAttribute;
      };
    }
    return acc;
  }, {});
};
