const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const { PERSON_POST_STATUSES } = require('../../../common/constants');
const { preRemove, postSave, postUpdateOne, postFindOneAndUpdate } = require('./hooks');

const { Schema } = mongoose;
const { ObjectId } = Schema;

// Person's profession schema
const professionSchema = mongoose.Schema({
  profession: {
    type: ObjectId,
    ref: 'Profession',
  },
  active: {
    type: Boolean,
    required: true,
  },
  media: [{ type: ObjectId, ref: 'Asset' }],
}, { _id : false });

// Person's schema
const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
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
      PERSON_POST_STATUSES.PUBLISHED,
    ],
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
  createdBy: {
    type: ObjectId,
    required: true,
  },
  biography: {
    documentId: {
      type: String,
      required: true,
    },
    modifiedTime: Date,
    lastModifiedBy: String,
  },
  authors: [{
    type: ObjectId,
    ref: 'User',
  }],
  reviewers: [{
    type: ObjectId,
    ref: 'User',
  }],
  born: Date,
  died: Date,
  title: String,
  portrait: String,
  rootAssetId: {
    type: ObjectId,
    required: true,
  },
  professions: [professionSchema],
}).pre('remove', { document: true }, preRemove)
  .post('save', postSave)
  .post('updateOne', postUpdateOne)
  .post('findOneAndUpdate', postFindOneAndUpdate);

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
