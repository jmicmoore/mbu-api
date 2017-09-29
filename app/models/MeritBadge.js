'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubRequirement = new Schema({
    part: String,
    text: String,
    note: String
});

const Requirement = new Schema({
    number: Number,
    description: String,
    note: String,
    subRequirements: [SubRequirement]
});

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

// module.exports = mongoose.model('MeritBadge', MeritBadge);

module.exports.MeritBadge = mongoose.model('MeritBadge', MeritBadge);
module.exports.Requirement = mongoose.model('Requirement', Requirement);
module.exports.SubRequirement = mongoose.model('SubRequirement', SubRequirement);
