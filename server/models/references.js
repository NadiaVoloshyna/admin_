const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema;

const schema = new Schema({
  id: String,
  personId: {
      type: ObjectId,
      ref: 'Person'
    },
  assetId:{
      type: ObjectId,
      ref: 'Asset'
    },
  listRefPersons: [{
    type: ObjectId
  }],
  listRefAssets: [{
    type: ObjectId
  }]
});

module.exports = mongoose.model('References', schema, 'references');

