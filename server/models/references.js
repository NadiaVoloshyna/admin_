const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema;

const schema = new Schema({
  dependent: {
    type: ObjectId,
    ref: 'Asset',
    required: true,
  },
  dependOn:{
    type: ObjectId,
    ref: 'Person',
    required: true,
  },
});

module.exports = mongoose.model('References', schema, 'references');
