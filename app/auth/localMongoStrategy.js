const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/models').User;
const passwordUtil = require('./passwordUtil');
const log = require('log4js').getLogger('localMongoStrategy');

// By default, LocalStrategy expects to find credentials in parameters named username and password.
const options = {
    usernameField: 'userId',
    passwordField: 'password'
};

module.exports = new LocalStrategy(options, (userId, password, done) => {
    UserModel.findOne({userId: userId}).lean().exec((err, user) => {
        if(err){
            log.error('Error authenticating user  ', err);
            return done(err);
        }
        if(!user){
            log.error('UserId "' + userId + '" was not found.');
            return done(null, false, {message: 'Invalid email or password'});
        }
        passwordUtil.compare(password, user.password, (err, match) => {
            if(err){
                log.error('Error comparing passwords for user "' + userId + '"', err);
                return done(err);
            }
            if(!match){
                log.error('User with Id "' + userId + '" has incorrect password.');
                return done(null, false, {message: 'Invalid email or password'});
            }
            return done(null, user);
        });
    });
});