const { body, check } = require('express-validator');
const Person = require('../../models/person');
const handle400 = require('../../middlewares/errorHandlers/handle400');
const { getHooksContext } = require('../../helpers');

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
    const updates = req.body;
    const { id } = req.params;

    try {
      await Person.findOneAndUpdate(
        { _id: id },
        { $set: updates },
        { hookMeta: getHooksContext(req) }
      );
    } catch (error) {
      return req.handle500(error);
    }

    res.status(200).end();
  });
};
