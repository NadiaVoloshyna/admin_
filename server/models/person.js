const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const { PERSON_POST_STATUSES, USER_ROLES } = require('../constants');
const GoogleApi = require('../services/google');

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
    media: [{ type: ObjectId, ref: 'Asset' }],
}, { _id : false });

// Person's permissions schema
const permissionSchema = mongoose.Schema({ 
    role: {
        type: String,
        required: true,
        enum: [
            USER_ROLES.AUTHOR,
            USER_ROLES.REVIEWER
        ]
    },
    permissionId: {
        type: String,
        required: true
    },
    user: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
        required: true
    }
});

// Person's schema
const schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true, 
        dropDups: true
    },
    status: {
        type: String,
        required: true,
        default: PERSON_POST_STATUSES.NEW,
        enum: [
            PERSON_POST_STATUSES.NEW,
            PERSON_POST_STATUSES.IN_PROGRESS,
            PERSON_POST_STATUSES.AWAITS_REVIEW,
            PERSON_POST_STATUSES.IN_REVIEW,
            PERSON_POST_STATUSES.READY_TO_PUBLISH,
            PERSON_POST_STATUSES.PUBLISHED
        ]   
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
        modifiedTime: Date,
        lastModifiedBy: String,
        permissions: {
            authors: Array,
            reviewers: Array
        }
    },
    born: Date,
    died: Date,
    title: String,
    portrait: String,
    rootAssetId: {
        type: ObjectId,
        required: true
    },
    professions: [professionSchema],
    permissions: [permissionSchema]
}).pre('remove', { document: true }, async function(next) {
    try {
        const { biography: { documentId }, rootAssetId } = this;

        // Remove google document
        await GoogleApi.delete(documentId);

        // Remove assets
        const Asset = mongoose.model('Asset');
        const asset = await Asset.findById(rootAssetId.toString());

        await asset.remove();
    } catch (error) {
        // TODO: handle error cases
        console.error(error);
    }

    next();
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Person', schema, 'person');