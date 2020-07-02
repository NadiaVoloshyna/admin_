const { body, check } = require('express-validator');
const Person = require('../../models/person');
const handleError = require('../../helpers/handleError');
const errorHandler = require('../../middlewares/errorHandler');

/**
 * Update single person
 */
module.exports = (router) => {
  router.put('/:id', [
    check('id').isMongoId(),
    body('name').isString().not().isEmpty()
      .escape(),
    body('portrait').if(body('portrait').exists()).isString().escape(),
    body('born').if(body('born').exists()).isString().escape(),
    body('died').if(body('died').exists()).isString().escape(),
  ], errorHandler, async (req, res) => {
    const { name, portrait, born, died, professions } = req.body;
    const { id } = req.params;

    try {
      await Person.updateOne(
        { _id: id },
        {
          name,
          portrait,
          born,
          died,
          professions
        }
      );
    } catch (error) {
      return handleError.custom(res, 500, error);
    }

    res.status(200).end();
  });
};
