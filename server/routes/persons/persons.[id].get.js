const { check } = require('express-validator');
const Person = require('../../models/person');
const GoogleApi = require('../../services/google');
const handle400 = require('../../middlewares/errorHandlers/handle400');

const getResource = async (req, res, next) => {
  const _id = req.params.id;

  // Get person from database
  try {
    const document = await Person.findOne({ _id })
      .populate('professions.profession')
      .populate('professions.media')
      .populate([{
        path: 'drivePermissions',
        model: 'DrivePermission',
        populate: [{
          path: 'user',
          model: 'User',
        }]
      }])
      .exec();

    if (!document) {
      return req.handle404(`Document ${_id} was not found`);
    }

    res.locals.person = document.toJSON();

    next();
  } catch (error) {
    return req.handle500(error);
  }
};

const checkPermissions = (req, res, next) => {
  const { user } = req;
  // Admin or super
  const canRead = user.read('persons');

  if (canRead === false) {
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
        lastModifiedBy: (lastModifyingUser && lastModifyingUser.displayName) || null
      };
    } else {
      throw new Error("Couldn't fetch file's metadata");
    }
  } catch (error) {
    return req.handle500(error);
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
  handle400,
  getResource,
  checkPermissions,
  getGoogleDocument,
  (req, res) => res.status(200).send(res.locals.response));
};
