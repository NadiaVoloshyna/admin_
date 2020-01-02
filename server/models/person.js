const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const schema = new Schema({
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
    biography: {
        documentId: {
            type: String,
            required: true
        },
        documentMeta: String
    },
    born: Date,
    died: Date,
    title: String,
    portrait: String,
    professions: [{ 
        name: {
            type: String,
            required: true
        }, 
        mediaType: {
            type: String,
            required: true
        },
        active: {
            type: Boolean,
            required: true
        },
        media: [{ type: Schema.Types.ObjectId, ref: 'Media' }],
    }]
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Person', schema, 'person');