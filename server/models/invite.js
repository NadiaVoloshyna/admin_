const mongoose = require('mongoose');
const { USER_ROLES } = require('../constants');

const ROLES = Object.values(USER_ROLES);

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
    enum: ROLES
  },
  token: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Invite', schema, 'invite');
