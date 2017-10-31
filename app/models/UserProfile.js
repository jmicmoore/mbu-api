'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserProfile = new Schema({

    userId: {
        type: String,
        required: true,
        unique: true
    },

    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    profileType: {type: String, required: true},
    council: {type: String, required: true},
    district: {type: String, required: true},
    otherCouncil: String,
    otherDistrict: String,

    // instructor shared
    timeAvailable: String,
    maxNumberOfCourses: String,

    // counselor specific
    email: String,
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

    // control flags
    basicRegistrationComplete: {
        type: Boolean,
        default: false
    },
    registrationComplete: {
        type: Boolean,
        default: false
    },

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