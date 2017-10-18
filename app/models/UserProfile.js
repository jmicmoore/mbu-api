'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserProfile = new Schema({

    userId: String,
    password: String,

    firstName: String,
    lastName: String,
    email: String,
    profileType: String,
    council: String,
    otherCouncil: String,
    district: String,
    otherDistrict: String,

    // counselor info
    address: String,
    city: String,
    state: String,
    zip: String,
    phone: String,
    contactMethods: [String],
    youthProtectionTrained: Boolean,
    ypTrainingDate: Date,
    timeAvailable: String,
    maxNumberOfCourses: String,
    meritBadges: [String],

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