'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MbuClass = new Schema({

    meritBadge: String,
    eagleRequired: Boolean,
    recommendedLength: String,
    recommendedSize: String,
    notes: String,
    numRequirements: Number,
    imageUrl: String,
    preRequisites: [String],
    counselors: [String],

    created: {
        type: Date,
        default: Date.now
    },
    lastModified : {
        type: Date,
        default: Date.now
    },
    createdBy : String,
    lastModifiedBy : String,
});

module.exports = mongoose.model('MbuClass', MbuClass);
