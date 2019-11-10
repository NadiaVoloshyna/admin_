const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, 
        dropDups: true
    }
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Profession', schema, 'profession');