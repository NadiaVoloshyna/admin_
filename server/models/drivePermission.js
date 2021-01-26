const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema;

// Permissions's schema
const schema = mongoose.Schema({
  permissionId: {
    type: String,
    required: true,
  },
  user: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  fileId: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
    required: true,
  },
});

module.exports = mongoose.model('DrivePermission', schema, 'drivePermission');
