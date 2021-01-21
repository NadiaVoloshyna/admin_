const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const { USER_ROLES } = require('../../common/constants');

const ROLES = Object.values(USER_ROLES);

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  displayName: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
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
  active: {
    type: Boolean,
    default: true,
    required: true
  },
  google: {
    id: {
      type: String
    },
    // token: {
    //   type: String,
    //   unique: true
    // }
  },
  image: {
    type: String
  }
}, {
  toObject: { virtuals: true }
});

userSchema.virtual('fullName').get(function getFullName() {
  return `${this.firstName} ${this.lastName}`;
});

// Poppulate permissions selected by user role
userSchema.virtual('permissions', {
  ref: 'Permissions',
  localField: 'role',
  foreignField: 'role',
});

// Poppulate google drive permissions selected by user id
userSchema.virtual('drivePermissions', {
  ref: 'DrivePermission',
  localField: '_id',
  foreignField: 'user',
});

userSchema.methods.toJson = function toJson() {
  const user = this.toObject();

  delete user.password;

  return user;
};

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', userSchema, 'user');
