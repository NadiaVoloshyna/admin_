const { body } = require('express-validator');
const Profession = require('../../models/profession');
const handleError = require('../../helpers/handleError');
const errorHandler = require('../../middlewares/errorHandler');

// Check if profession exists
const checkProfession = async (req, res, next) => {
  const { name } = req.body;
  try {
    const profession = await Profession.findOne({ name });
    if (profession) {
      // profession with this name is already exist
      res.status(409).send({
        id: profession._id,
        name: profession.name
      });
      return;
    }
    next();
  } catch (error) {
    return handleError.custom(res, 500, error);
  }
};

// Create profession
const createProfession = async (req, res, next) => {
  const { name } = req.body;
  try {
    const newProfession = await new Profession({
      name
    }).save();
    const response = {
      id: newProfession._id,
      name: newProfession.name
    };
    res.locals.response = response;
    next();
  } catch (error) {
    return handleError.custom(res, 500, error);
  }
};

module.exports = (router) => {
  /**
   * Create profession
   * 1. Find profession in DB
   * 2. If profession exists, exit
   * 3. If profession not exists create google document for the person
   * 4. Create person
   * 5. If document creation failed continue creating person
   * 6. If document was created add document id to persons data
   */
  router.post('/', [
    body('name').isString().escape()
  ], errorHandler, checkProfession, createProfession,
  (req, res) => res.status(201).send(res.locals.response));
};
