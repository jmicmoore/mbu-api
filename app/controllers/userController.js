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
        return res.status(200).send(savedUserProfile);
    });

};