const { body, check } = require('express-validator');
const Person = require('../../models/person');
const References = require('../../models/references');
const handle400 = require('../../middlewares/errorHandlers/handle400');

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
  ], handle400, async (req, res) => {
    const { name, portrait, born, died, professions } = req.body;
    const { id } = req.params;

    try {
      if (portrait) {
        await new References({
          depend: id,
          dependOn: portrait // if portrait is a type ObjectId
        }).save();
      }

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
      return req.handle500(error);
    }

    res.status(200).end();
  });
};
