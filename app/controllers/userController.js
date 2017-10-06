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
        })
    }

    const userProfile = req.body;
    UserProfileModel.findByIdAndUpdate(userProfile._id, userProfile, (err, doc) => {
        if(err){
            console.log('Error updating user profile: ', err);
            res.status(500).send('Error updating user profile');
        } else {
            res.status(200).send('User profile updated successfully');
        }
    });
};

module.exports.getProfile = (req, res) => {
    const email = req.params.email;

    UserProfileModel.findOne({email: email}).lean().exec( (err, userProfile) => {
        if(err){
            console.log('Error getting user profile: ', err);
            res.status(500).send('Error getting user profile');
        } else {
            res.status(200).send(userProfile);
        }
    });
};

module.exports.login = (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    UserProfileModel.findOne({ email: email }).lean().exec( (err, person) => {
        if (err) {
            console.error('Error logging user in ', err);
            return res.status(403).send('Either e-mail or password was incorrect');
        }

        if(!person){
            console.error('User with e-mail "' + email + '" was not found.');
            return res.status(403).send('Either e-mail or password was incorrect');
        }

        if(person.password !== password){
            console.error('User with e-mail "' + email + '" has incorrect password.');
            return res.status(403).send('Either e-mail or password was incorrect');
        }
        const safePerson = _.omit(person, ['password', 'passwordConfirm']);
        return res.status(200).send(safePerson);
    });
};