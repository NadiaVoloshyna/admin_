const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const schema = new Schema({
  id: String,
  // Name of the asset. E.g. name of the folder, image, album and so on
  name: {
    type: String,
    required: true
  },
  // Parent folder id
  parent: {
    type: ObjectId
  },
  // Type of the asset
  type: {
    type: String,
    required: true,
    enum: ['FOLDER', 'IMAGE', 'VIDEO', 'ALBUM']
  },
  // Url of the assets, image, video, etc.
  url: {
    type: String
  },
  // Id of the user who created the asset
  createdBy: {
    type: ObjectId,
    required: true
  },
  // Date when asset was created
  created: {
    type: Date,
    required: true,
    default: Date.now
  },
  // Name of the author (in Album)
  author: {
    type: String
  },
  // Year of (song, album, video)
  year: {
    type: Number
  },
  // Description of the asset (Album)
  description: {
    type: String
  }
  // Recursive asset deletion
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