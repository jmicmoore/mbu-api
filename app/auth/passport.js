const passport = require('passport');
const UserModel = require('../models/models').User;
const localStrategy = require('./localMongoStrategy');

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser((user, done) => {
    done(null, user.userId);
});

passport.deserializeUser((userId, done) => {
    UserModel.findOne({userId: userId}).lean().exec((err, user) => {
        done(err, user);
    });
});

passport.use('local', localStrategy);

module.exports = passport;