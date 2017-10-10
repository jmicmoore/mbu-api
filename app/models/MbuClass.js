'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MbuClass = new Schema({

    counselor: String,
    meritBadge: String,
    recommendedLength: String,
    recommendedSize: String,
    notes: String,
    preRequisites: [String],

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
