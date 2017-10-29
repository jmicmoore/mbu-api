// import bcrypt from "bcrypt-nodejs"
// import crypto from "crypto" // TODO: do we need this?
const SALT_ROUNDS = 10;

// TODO: uncomment to turn on salt and hashing

// auto-gen a salt and hash
// callback = function(err, hash)
module.exports.encrypt = (plaintextPassword, callback) => {
    // bcrypt.hash(plaintextPassword, SALT_ROUNDS, callback);
    callback(null, plaintextPassword);
};

// callback = function(err, match) // true or false
module.exports.compare = (plaintextPassword, hash, callback) => {
    // bcrypt.compare(plaintextPassword, hash, callback);
    callback(null, plaintextPassword == hash);
};