const _ = require('lodash');
const async = require('async');
const mongoose = require('mongoose');
const factory = require('../app/models/modelFactory');
const MeritBadgeModel = require('../app/models/MeritBadge').MeritBadge;
const autoParsedMeritBadges = require('./meritBadges.json');

const architecture = require('./problemBadges/Architecture.json');
const electronics = require('./problemBadges/Electronics.json');
const geocaching = require('./problemBadges/Geocaching.json');
const inventing = require('./problemBadges/Inventing.json');
const metalwork = require('./problemBadges/Metalwork.json');
const railroading = require('./problemBadges/Railroading.json');
const scoutingHeritage = require('./problemBadges/Scouting Heritage.json');

const problemBadges = [
    architecture,
    electronics,
    geocaching,
    inventing,
    metalwork,
    railroading,
    scoutingHeritage
];

const MONGO_URL = 'mongodb://localhost/mbu-db';

module.exports.loadMeritBadgesIntoDb = () => {

    async.waterfall([
        (next) => {
            connectToMongo(MONGO_URL, next);
        },
        (next) => {
            combineJsonFiles(autoParsedMeritBadges, problemBadges, next);
        },
        convertToModels,
        (meritBadgeModels, next) => {
            console.log('Saving merit badges...');
            saveMeritBadges(meritBadgeModels, next);
        },
        disconnectFromMongo
    ], (err, result) => {
        if(err){
            console.log("Error during merit badge load into DB: ", err);
        } else {
            console.log('Merit badges loaded into DB successfully');
        }
    });
};

const connectToMongo = (mongoUrl, next) => {
    mongoose.connect(mongoUrl, next);
};

const combineJsonFiles = (autoParsedMeritBadges, problemBadges, next) => {
    const allMeritBadges = autoParsedMeritBadges.concat(problemBadges);
    next(null, allMeritBadges);
};

const convertToModels = (meritBadges, next) => {
    const meritBadgeModels = _.map(meritBadges, meritBadge => {
        return factory.createMeritBadgeModel(meritBadge);
    });
    next(null, meritBadgeModels);
};

const saveMeritBadges = (meritBadgeModels, next) => {
    MeritBadgeModel.insertMany(meritBadgeModels, function(err, docs) {
        if(err){
            next(err);
        } else {
            next(null);
        }
    });
};

const disconnectFromMongo = (next) => {
    mongoose.connection.close((err) => {
        next(err);
    });
};

this.loadMeritBadgesIntoDb();