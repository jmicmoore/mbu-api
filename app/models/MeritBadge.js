'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Requirement = require('./Requirement');

const MeritBadge = new Schema({

    name: String,
    eagleRequired: Boolean,
    imageUrl: String,
    originalImageUrl: String,
    requirements: [Requirement],

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

module.exports.MeritBadge = MeritBadge;
