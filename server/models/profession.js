const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;
const { ObjectId } = Schema;

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
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
  description: {
    type: String,
  },
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Profession', schema, 'profession');
