const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  displayName: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
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
  }
}, {
  toObject: { virtuals: true }
});

schema.virtual('fullName').get(function getFullName() {
  return `${this.firstName} ${this.lastName}`;
});

schema.methods.toJson = function toJson() {
  const user = this.toObject();

  delete user.password;

  return user;
};

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', schema, 'user');
