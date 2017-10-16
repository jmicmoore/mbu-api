'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScheduledCourse = new Schema({

    courseName: String,
    classroom: String,
    period: String,
    counselor: String,

    // fields from Course
    length: String,
    maxYouth: String,
    notes: String,

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

module.exports = mongoose.model('ScheduledCourse', ScheduledCourse);
