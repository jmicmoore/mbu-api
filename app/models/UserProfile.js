'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserProfile = new Schema({

    firstName: String,
    lastName: String,
    email: String,
    password: String,
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
    contactMethod: String,
    youthProtectionTrained: Boolean,
    ypTrainingDate: Date,
    timeAvailable: String,
    maxNumberOfClasses: String,
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