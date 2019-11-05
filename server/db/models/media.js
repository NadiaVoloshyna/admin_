const mongoose = require('mongoose');

const Media = mongoose.model('Media', {
    id: String,
    personId: String,
    mediaId: String,
}, 'media');

module.exports = Media;