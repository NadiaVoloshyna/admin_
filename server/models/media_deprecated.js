const mongoose = require('mongoose');

const Media = mongoose.model('Media', {
  id: String,
  mediaId: String,
  tags: {
    type: Array
  },
  parentId: {
    type: String
  },
  type: {
    type: String,
    required: true,
    enum: ['folder', 'image', 'video', 'text']
  }
}, 'media');

module.exports = Media;
