const _ = require('lodash');
const UserProfileModel = require('../models/UserProfile');

module.exports.createProfile = (req, res) => {
    if (!req.is('application/json')) {
        return res.status(406).send({
            message: 'Only json content is acceptable'
        })
    }

    var model = new UserProfileModel(req.body);
    model.save(function (err, savedUserProfile) {
        if (err) {
            console.error('Error saving user profile ', err);
            return res.status(500).send('Error saving user profile');
        }
        return res.status(200).send('User registered successfully');
    });

};

module.exports.updateProfile = (req, res) => {
    if (!req.is('application/json')) {
        return res.status(406).send({
            message: 'Only json content is acceptable'
        });
    }

    const userProfile = req.body;
    const userProfileId = userProfile._id || new mongoose.Types.ObjectId;
    userProfile.lastModified = new Date();

    UserProfileModel.findByIdAndUpdate(userProfileId, userProfile, {upsert: true}, (err, doc) => {
        if(err){
            console.log('Error updating user profile: ', err);
            res.status(500).send('Error updating user profile');
        } else {
            res.status(200).send('User profile updated successfully');
        }
    });
};

module.exports.getProfileByUserId = (req, res) => {
    const userId = req.params.userId || req.user.userId;

    UserProfileModel.findOne({userId: userId}).lean().exec( (err, userProfile) => {
        if(err){
            console.log('Error getting user profile: ', err);
            res.status(500).send('Error getting user profile');
        } else {
            res.status(200).send(userProfile);
        }
    });
};

module.exports.getCounselorNames = (req, res) => {
    UserProfileModel.find({profileType: 'MeritBadgeCounselor'}, 'firstName lastName').lean().exec( (err, counselors) => {
        if(err){
            console.log('Error getting counselors: ', err);
            res.status(500).send('Error getting counselors');
        } else {
            res.status(200).send(counselors);
        }
    });
};