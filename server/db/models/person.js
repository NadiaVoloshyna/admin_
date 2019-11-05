const mongoose = require('mongoose');

const Person = mongoose.model('Person', {
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
    portraits: {
        primary: { type: String, required: false },
        secondary: { type: [String], default: [] }
    },
    media: { type: Array, default: [] }
}, 'person');

module.exports = Person;