'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: update schemas to use referencing instead of embedding where it makes sense
// https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-1
// https://stackoverflow.com/questions/5373198/mongodb-relationships-embed-or-reference
// https://keon.io/mongodb-schema-design/

const Student = new Schema({

    profileType: {type: String, required: true}, // Scout or Venturer
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    unit: String,
    level: String, //rank(scout) or recognition(venturer)
    leaderFirstName: String,
    leaderLastName: String,
    leaderEmail: String,
    leaderPhone: String,
    leaderUnit: String,
    courses: [{ type: Schema.Types.ObjectId, ref: 'ScheduledCourse' }],

    signedIn: Boolean,

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

module.exports = Student;