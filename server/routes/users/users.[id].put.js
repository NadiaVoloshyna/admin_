const { body, param } = require('express-validator');
const User = require('../../models/user');
const errorHandler = require('../../middlewares/errorHandler');
const handleError = require('../../helpers/handleError');

module.exports = (router) => {
  router.put('/:id', [
    param('id').isMongoId(),
    body('active').if(body('active').exists()).isBoolean()
  ], errorHandler, async (req, res) => {
    const query = {
      _id: req.params.id
    };

    const constructBody = (body, fields) => {
      return fields.reduce((acc, key) => {
        // eslint-disable-next-line no-prototype-builtins
        if (body.hasOwnProperty(key)) {
          acc[key] = body[key];
        }

        return acc;
      }, {});
    };

    const updateBody = constructBody(req.body, [
      'active'
    ]);

    try {
      const user = await User.findByIdAndUpdate(query, updateBody);
      res.status(200).send(user);
    } catch (error) {
      handleError.custom(res, 500, error);
    }
  });
};
