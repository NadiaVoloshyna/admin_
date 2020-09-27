const { check } = require('express-validator');
const Activity = require('../../models/activity');
const handle400 = require('../../middlewares/errorHandlers/handle400');

module.exports = (router) => {
  /**
  * Get activities of a person
  */
  router.get('/:id/activities', [
    check('id').isMongoId(),
  ], handle400, async (req, res) => {
    const { id } = req.params;

    try {
      const activities = await Activity
        .find({ personId: id })
        .sort('-date');

      res.status(200).send(activities);
    } catch (error) {
      req.handle500(error);
    }
  });
};
