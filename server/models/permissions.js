const mongoose = require('mongoose');
const { USER_ROLES } = require('../../common/constants');

const ROLES = Object.values(USER_ROLES);

// Permissions's schema
const schema = mongoose.Schema({
  role: {
    type: String,
    required: true,
    enum: ROLES
  },
  permitted: {
    type: Boolean,
    required: true,
    default: false,
  },
  resource: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  attributes: {
    type: Array,
    default: [],
  }
});

module.exports = mongoose.model('Permissions', schema, 'permissions');
