const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, 
        dropDups: true
    },
    created: {
        type: Date,
        required: true,
        default: Date.now
    },
    biography: String,
    born: Date,
    died: Date,
    title: String,
    portrait: String,
    media: { type: Array, default: [] }
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Person', schema, 'person');