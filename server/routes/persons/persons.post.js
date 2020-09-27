const { body } = require('express-validator');
const Person = require('../../models/person');
const Asset = require('../../models/asset');
const DrivePermission = require('../../models/drivePermission');
const GoogleApi = require('../../services/google');
const handle400 = require('../../middlewares/errorHandlers/handle400');
const { GOOGLE_USER_ROLES } = require('../../constants');
const { USER_ROLES } = require('../../../common/constants');

/**
 * Content
 * 1. Check if user has permissions to create a person
 * 2. Check if we already have this person in database
 * 3. Create google document for the person
 * 4. Create view permission for the document if current user is the author
 * 5. Create root asset for the person
 * 6. Create person
 */

// 1. Check if user has permissions to create a person
const checkPermissions = (req, res, next) => {
  const { user } = req;
  const canCreatePerson = user.create('persons');

  if (canCreatePerson) {
    next();
  } else {
    res.status(403).end();
  }
};

// 2. Check if we already have this person in database
const findResource = async (req, res, next) => {
  const { name } = req.body;

  // Check if person exists
  try {
    const person = await Person.findOne({ name });

    if (person) {
      // Person with this name exist
      return res.status(409).send({
        id: person._id,
        name: person.name
      });
    }
  } catch (error) {
    return req.handle500(error);
  }

  next();
};

// 3. Create google document for the person
const createGoogleDoc = async (req, res, next) => {
  const { name } = req.body;

  // Create google document for current person
  try {
    const { data: { id } } = await GoogleApi.createDocument(name);
    res.locals.fileId = id;

    next();
  } catch (error) {
    req.handle500(error);
  }
};

// 4. Create view permission for the document if current user is the author
const createDocumentPermission = async (req, res, next) => {
  const { user } = req;
  const { fileId } = res.locals;

  // Create user permissions
  try {
    if (user.role === USER_ROLES.AUTHOR) {
      const { data: { id } } = await GoogleApi.createPermission(
        fileId, GOOGLE_USER_ROLES.READER, user.email
      );

      const permission = {
        permissionId: id,
        user: user._id,
        fileId,
      };

      // Create permission
      await new DrivePermission(permission).save();
    }

    next();
  } catch (error) {
    req.handle500(error);
  }
};

// 5. Create root asset for the person
const createAsset = async (req, res, next) => {
  const { name } = req.body;
  const { user } = req;

  try {
    const rootAsset = await new Asset({
      type: 'FOLDER',
      name,
      createdBy: user._id
    }).save();

    res.locals.rootAssetId = rootAsset._id;
    next();
  } catch (error) {
    req.handle500(error);
  }
};

// 6. Create person
const createPerson = async (req, res) => {
  const { user } = req;
  const { name } = req.body;
  const { fileId, rootAssetId } = res.locals;

  let newPerson = {
    name,
    rootAssetId,
    createdBy: user._id,
    biography: {
      documentId: fileId
    }
  };

  // Create person
  try {
    newPerson = await new Person(newPerson).save({ user });
  } catch (error) {
    return req.handle500(error);
  }

  res.status(302).send({
    id: newPerson._id,
    name: newPerson.name
  });
};

module.exports = (router) => {
  router.post('/',
    [
      body('name').isString().escape(),
    ],
    handle400,
    checkPermissions,
    findResource,
    createGoogleDoc,
    createDocumentPermission,
    createAsset,
    createPerson);
};
