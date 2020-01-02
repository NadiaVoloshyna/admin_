const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const schema = new Schema({
  id: String,
  name: {
    type: String,
    required: true
  },
  parent: {
    type: ObjectId
  },
  type: {
      type: String,
      required: true,
      enum: ['folder', 'image', 'video']
  },
  url: {
    type: String
  },
  createdBy: {
    type: ObjectId,
    required: true
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  }
}).pre('remove', { document: true }, async function(next) {
  try {
    const Asset = mongoose.model('Asset');
    const children = await Asset.find({parent: this._id});

    children.forEach(doc => {
      doc.remove();
    });
    
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Asset', schema, 'asset');