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
    ref: 'User',
    required: true,
  },
  description: {
    type: String,
  },
}, { collation: { locale: 'en_US', strength: 1 } });

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Profession', schema, 'profession');
