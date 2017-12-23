'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passwordUtil = require('../auth/passwordUtil');

const User = new Schema({

    userId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

});

// TODO: add password salting by uncommenting
// TODO: the below has more simple implementation - bcrypt does auto salt for you

// NOTE:  You should NOT use the fat arrow function here
// More at:  https://stackoverflow.com/questions/36957440/mongoose-pre-post-midleware-cant-access-this-instance-using-es6
User.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')){
        return next();
    }
    passwordUtil.encrypt(user.password, (err, hash) => {
        if (err){
            return next(err);
        }
        user.password = hash;
        next();
    });
});

module.exports = mongoose.model('User', User);