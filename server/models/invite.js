const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'author', 'reviewer']
  },
  token: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Invite', schema, 'invite');