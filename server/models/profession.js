const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, 
        dropDups: true
    },
    // mediaType: {
    //     type: String,
    //     required: true
    // },
    // media: [{ type: Schema.Types.ObjectId, ref: 'Media' }],
    // active: {
    //     type: Boolean,
    //     required: true
    // } 
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Profession', schema, 'profession');