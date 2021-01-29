const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  personId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },

  message: {
    type: String,
    required: true,
  },

  content: {
    type: String,
  },
});

module.exports = mongoose.model('Activity', schema, 'activity');
