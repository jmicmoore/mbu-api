'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Classroom = new Schema({

    name: String,
    capacity: Number,

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

module.exports = Classroom;
