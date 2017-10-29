'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserProfile = new Schema({

    userId: {
        type: String,
        unique: true
    },

    firstName: String,
    lastName: String,
    email: String,
    profileType: String,
    council: String,
    otherCouncil: String,
    district: String,
    otherDistrict: String,

    // instructor shared
    timeAvailable: String,
    maxNumberOfCourses: String,

    // counselor specific
    address: String,
    city: String,
    state: String,
    zip: String,
    phone: String,
    contactMethods: [String],
    youthProtectionTrained: Boolean,
    ypTrainingDate: Date,
    meritBadges: [String],

    // venturer instructor specific
    venturingClasses: [String],

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

module.exports = mongoose.model('UserProfile', UserProfile);