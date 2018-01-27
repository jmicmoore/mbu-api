'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompletedCourse = new Schema({

    student: { type: Schema.Types.ObjectId, ref: 'Student' },
    course: { type: Schema.Types.ObjectId, ref: 'ScheduledCourse' },

    attended: Boolean,
    completed: Boolean,

    // merit badge specific
    completedRequirements: [{ type: Schema.Types.ObjectId, ref: 'Requirement' }],

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

module.exports = CompletedCourse;