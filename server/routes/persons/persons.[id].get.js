const { check } = require('express-validator');
const Person = require('../../models/person');
const GoogleApi = require('../../services/google');
const handleError = require('../../helpers/handleError');
const errorHandler = require('../../middlewares/errorHandler');
const ac = require('../../../accesscontrol.config');

const getResource = async (req, res, next) => {
  const _id = req.params.id;

  // Get person from database
  try {
    const document = await Person
      .findOne({ _id })
      .populate('professions.profession')
      .populate('professions.media')
      .populate('permissions.user', '-password');

    if (!document) {
      return handleError.custom(res, 404);
    }

    res.locals.person = document.toJSON();

    next();
  } catch (error) {
    return handleError.custom(res, 500, error);
  }
};

const checkPermissions = (req, res, next) => {
  // Admin or super
  const permission = ac.can(req.user.role).readAny('person');

  if (permission.granted === false) {
    return res.status(403).end();
  }

  next();
};

const getGoogleDocument = async (req, res, next) => {
  const { person } = res.locals;
  let documentMeta;

  // Get Google Doc Metadata by id
  try {
    const response = await GoogleApi.getFileMeta(person.biography.documentId);

    if (response && response.data) {
      const { modifiedTime, lastModifyingUser } = response.data;
      documentMeta = {
        modifiedTime,
        lastModifiedBy: ((lastModifyingUser && lastModifyingUser.displayName) || null)
      };
    } else {
      throw new Error("Couldn't fetch file's metadata");
    }
  } catch (error) {
    return handleError.custom(res, 500, error);
  }

  const responseBody = {
    ...person,
    biography: {
      ...person.biography,
      ...documentMeta
    }
  };

  res.locals.response = responseBody;
  next();
};

module.exports = (router) => {
  /**
   * Get single person
   */
  router.get('/:id', [
    check('id').isMongoId()
  ],
  errorHandler,
  getResource,
  checkPermissions,
  getGoogleDocument,
  (req, res) => res.status(200).send(res.locals.response));
};
