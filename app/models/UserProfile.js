'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserProfile = new Schema({

    firstName: String,
    lastName: String,
    email: String,
    emailConfirm: String,
    password: String,
    passwordConfirm: String,
    selectedProfileType: String,
    selectedCouncil: String,
    otherCouncil: String,
    selectedDistrict: String,
    otherDistrict: String,

    // counselor info
    address: String,
    city: String,
    selectedState: String,
    zip: String,
    phone: String,
    youthProtectionTrained: Boolean,
    ypTrainingDate: Date,

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