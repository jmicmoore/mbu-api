'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema({
    // common
    courseType: String,
    recommendedLength: String,
    recommendedSize: String,
    notes: String,
    teachers: [String],

    // merit badge specific
    numRequirements: Number,
    preRequisites: [String],

    // fields from MeritBadge
    meritBadge: String,
    eagleRequired: Boolean,
    imageUrl: String,

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

module.exports = mongoose.model('Course', Course);
