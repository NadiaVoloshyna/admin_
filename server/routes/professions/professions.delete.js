const { body } = require('express-validator');
const Profession = require('../../models/profession');
const handle400 = require('../../middlewares/errorHandlers/handle400');

module.exports = (router) => {
  /**
   * Delete one or multiple professions
   */
  router.delete('/', [
    body('ids').exists().isArray({ min: 1 }).withMessage('At least one id is required'),
  ], handle400, async (req, res) => {
    const { ids } = req.body;

    try {
      await Profession.deleteMany({
        _id: ids,
      });

      res.status(200).end();
      return;
    } catch (error) {
      req.handle500(error);
    }
  });
};
