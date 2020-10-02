const mongoose = require('mongoose');
const GoogleApi = require('../../services/google');
const Activity = require('../activity');
const References = require('../references');
const { logger } = require('../../services/gcp/logger');
const { createActivity } = require('./utils');

/**
 * pre `remove` hook
 * @param {Func} next Function that calls next middleware
 */
exports.preRemove = async function preRemove(next) {
  try {
    const { biography: { documentId }, rootAssetId, _id } = this;

    // Remove google document
    await GoogleApi.delete(documentId);

    // Remove assets
    const Asset = mongoose.model('Asset');
    const asset = await Asset.findById(rootAssetId.toString());

    await asset.remove();

    // Remove references
    await References.deleteMany({ dependOn: _id });

    // Remove person's activities
    await Activity.deleteMany({ personId: _id });
  } catch (error) {
    logger.error(error);
  }

  next();
};

/**
 * post `save` hook
 * @param {Object} document Document before save
 * @param {Func} next Function that calls next middleware
 */
exports.postSave = async function postSave(document, next) {
  try {
    const { user } = this.$__.saveOptions;
    const activity = {
      personId: this._id,
      message: `${user.fullName} <b>created</b> person`,
    };

    await new Activity(activity).save();
  } catch (error) {
    logger.error(error);
  }

  next();
};

/**
 * post `updateOne` hook
 * @param {Object} document Document before update
 * @param {Func} next Function that calls next middleware
 */
exports.postUpdateOne = async function postUpdateOne(document, next) {
  try {
    const { _id } = this.getQuery();

    const activity = {
      personId: _id,
      ...createActivity(this.options),
    };

    await new Activity(activity).save();
  } catch (error) {
    logger.error(error);
  }

  next();
};

/**
 * post `findOneAndUpdate` hook
 * @param {Object} document Document before update
 * @param {Func} next Function that calls next middleware
 */
exports.postFindOneAndUpdate = async function postFindOneAndUpdate(document, next) {
  try {
    const activity = {
      personId: document._id,
      ...createActivity(this.options, document, this.getUpdate()),
    };

    await new Activity(activity).save();
  } catch (error) {
    logger.error(error);
  }

  next();
};
