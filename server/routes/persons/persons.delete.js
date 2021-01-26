const { body } = require('express-validator');
const { each } = require('async');
const { PERSON_POST_STATUSES } = require('../../../common/constants');
const Person = require('../../models/person');
const handle400 = require('../../middlewares/errorHandlers/handle400');

// 1. Get resources from database
const getResources = async (req, res, next) => {
  const { ids } = req.body;

  try {
    const persons = await Person.find({ _id: { $in: ids } });

    if (!persons || !persons.length) {
      return res.status(404).end();
    }

    res.locals.persons = persons;
    next();
  } catch (error) {
    return req.handle500(error);
  }
};

// 2. Check if user has permissions to delete a person
const checkPermissions = (req, res, next) => {
  try {
    const { user } = req;

    let { persons } = res.locals;
    let permission = user.deleteAny('persons');

    if (permission === false) {
      permission = user.deleteOwn('persons');

      if (permission === false) {
        return res.status(403).end();
      }

      // Filter out persons not created by user and not in in_progress status
      persons = persons.filter(person => (
        person.createdBy._id.equals(user._id)
        && person.status === PERSON_POST_STATUSES.IN_PROGRESS
      ));
      res.locals.persons = persons;

      if (!persons || !persons.length) {
        return res.status(403).end();
      }
    }
  } catch (error) {
    return req.handle500(error);
  }

  next();
};

// 3. Delete one or multiple persons
const deletePersons = async (req, res) => {
  try {
    const { persons } = res.locals;
    // eslint-disable-next-line no-return-await
    await each(persons, async (person) => await person.remove());

    return res.status(200).end();
  } catch (error) {
    return req.handle500(error);
  }
};

/**
 * Delete one or multiple persons
 * 1. Try to delete google docs asocciated with persons
 * 2. If above is success delete persons
 * 3. If google docs deletion fails do not delete persons
 */
module.exports = (router) => {
  router.delete('/', [
    body('ids').exists().isArray({ min: 1 }).withMessage('At least one id is required'),
  ],
  handle400,
  getResources,
  checkPermissions,
  deletePersons);
};
