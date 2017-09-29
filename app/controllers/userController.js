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