const passport = require('passport');
const UserModel = require('../models/User');
const log = require('log4js').getLogger('userController');

module.exports.register = (req, res, next) => {
    if (!req.is('application/json')) {
        return res.status(406).send({
            message: 'Only json content is acceptable'
        });
    }

    const model = new UserModel(req.body);
    model.save( (err) => {
        if (err) {
            log.error('Error saving user profile ', err);
            return res.status(500).send('Error saving user profile');
        }
        next();
    });
};

module.exports.login = (req, res, next) => {

    // TODO: try this without the custom callback
    // delete this method andjust use passport.authenticate on the router directly
    // app.post('/login',
    //     passport.authenticate('local'),
    //     userProfileController.getProfileByUserId);
    // passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' });

    const authCallback = (err, user) => {
        if(err){
            log.error('Unexpected error while authenticating', err);
            return next(err);
        }
        if(!user){
            log.error('User not found while authenticating');
            return res.status(401).send('Either username or password was incorrect');
        }

        // ***********************************************************************
        // "Note that when using a custom callback, it becomes the application's
        // responsibility to establish a session (by calling req.login()) and send
        // a response."
        // Source: http://passportjs.org/docs
        // ***********************************************************************
        // Passport exposes a login() function on req (also aliased as logIn())
        // that can be used to establish a login session
        req.logIn(user, loginErr => {
            if(loginErr) {
                log.error('Unexpected error while calling req.logIn', loginErr);
                return res.status(401).send('Either username or password was incorrect');
            }
            next();
        });
    };

    passport.authenticate('local', authCallback)(req, res, next);
};

module.exports.sendUserId = (req, res) => {
    res.status(200).send({userId: req.user.userId});
};

module.exports.logout = (req, res) => {
    // the logout method is added to the request object automatically by Passport
    req.logout();
    res.status(200).send('User logged out successfully');
};

module.exports.validateUniqueUserId = (req, res, next) => {
    const userId = req.body.userId;

    UserModel.findOne({userId: userId}).lean().exec( (err, user) => {
        if(err){
            log.error('Error validating unique userId: ', err);
            res.status(500).send('Unexpected error');
        } else {
            if(user){
                res.status(409).send('This username is already taken');
            } else {
                next();
            }
        }
    });
};