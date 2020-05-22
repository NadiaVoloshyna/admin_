const Profession = require('../../models/profession');
const { body } = require('express-validator');
const handleError = require('../../helpers/handleError');
const errorHandler = require('../../middlewares/errorHandler');

module.exports = (router) => {
    /**
   * Delete one or multiple professions
   */
  router.delete('/', [
    body('ids').exists().isArray({min: 1}).withMessage('At least one id is required'),
  ], errorHandler, async (req, res) => {
    const { ids } = req.body;

    try {
      await Profession.deleteMany({ 
        _id: ids
      });

      res.status(200).end();
      return;
    } catch (error) {
      return handleError.custom(res, 500, error);
    }
  });
}