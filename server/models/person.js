const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const { PERSON_POST_STATUSES } = require('../../common/constants');
const GoogleApi = require('../services/google');
const { logger } = require('../services/gcp/logger');

const { Schema } = mongoose;
const { ObjectId } = Schema;

// Person's profession schema
const professionSchema = mongoose.Schema({
  profession: {
    type: ObjectId,
    ref: 'Profession'
  },
  active: {
    type: Boolean,
    required: true
  },
  media: [{ type: ObjectId, ref: 'Asset' }],
}, { _id : false });

// Person's schema
const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  status: {
    type: String,
    required: true,
    default: PERSON_POST_STATUSES.NEW,
    enum: [
      PERSON_POST_STATUSES.NEW,
      PERSON_POST_STATUSES.IN_PROGRESS,
      PERSON_POST_STATUSES.IN_REVIEW,
      PERSON_POST_STATUSES.READY,
      PERSON_POST_STATUSES.PUBLISHED
    ]
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  },
  createdBy: {
    type: ObjectId,
    required: true,
  },
  biography: {
    documentId: {
      type: String,
      required: true
    },
    modifiedTime: Date,
    lastModifiedBy: String,
    permissions: {
      authors: Array,
      reviewers: Array
    }
  },
  born: Date,
  died: Date,
  title: String,
  portrait: String,
  rootAssetId: {
    type: ObjectId,
    required: true
  },
  professions: [professionSchema],
}).pre('remove', { document: true }, async function removeHook(next) {
  try {
    const { biography: { documentId }, rootAssetId } = this;

    // Remove google document
    await GoogleApi.delete(documentId);

    // Remove assets
    const Asset = mongoose.model('Asset');
    const asset = await Asset.findById(rootAssetId.toString());

    await asset.remove();
  } catch (error) {
    logger.error(error);
  }

  next();
});

schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true });

// Poppulate google drive permissions selected by user id
schema.virtual('drivePermissions', {
  ref: 'DrivePermission',
  localField: 'biography.documentId',
  foreignField: 'fileId',
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Person', schema, 'person');
