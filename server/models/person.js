const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// Person's profession schema
const professionSchema = mongoose.Schema({ 
    profession: {
        type: ObjectId,
        ref: 'Profession'
    }, 
    active: {
        type: Boolean,
        required: true
    },
    media: [{ type: ObjectId, ref: 'Media' }],
}, { _id : false });

// Person's schema
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
    createdBy: {
        type: ObjectId,
        required: true,
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
    rootAssetId: {
        type: ObjectId,
        required: true
    },
    professions: [professionSchema]
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Person', schema, 'person');