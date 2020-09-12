const Permissions = require('../../models/permissions');

module.exports = (router) => {
  /**
   * Get permissions
   */
  router.get('/', async (req, res) => {
    try {
      const permissions = await Permissions.find({});

      res.send(permissions);
    } catch (error) {
      req.handle500(error);
    }
  });
};
