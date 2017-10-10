const profileTypes = require('../../db-init/profile_types.json');
const councils = require('../../db-init/councils.json');
const districts = require('../../db-init/districts.json');
const states = require('../../db-init/states.json');
const MeritBadgeModel = require('../models/MeritBadge').MeritBadge;
const ClassroomModel = require('../models/Classroom');
const factory = require('../models/modelFactory');

module.exports.getProfileTypes = (req, res) => {
    res.status(200).send(profileTypes);
};

module.exports.getCouncils = (req, res) => {
    res.status(200).send(councils);
};

module.exports.getDistricts = (req, res) => {
    res.status(200).send(districts);
};

module.exports.getStates = (req, res) => {
    res.status(200).send(states);
};

module.exports.getAllMeritBadges = (req, res) => {
    MeritBadgeModel.find({}).lean().exec( (err, meritBadges) => {
        if(err){
            console.log('Error getting Merit Badges: ', err);
            res.status(500).send('Error getting Merit Badges');
        } else {
            res.status(200).send(meritBadges);
        }
    });
};

module.exports.getMeritBadgeNames = (req, res) => {
    MeritBadgeModel.find({}, 'name').lean().exec( (err, meritBadgeNames) => {
        if(err){
            console.log('Error getting Merit Badge names: ', err);
            res.status(500).send('Error getting Merit Badge names');
        } else {
            res.status(200).send(meritBadgeNames);
        }
    });
};

module.exports.getMeritBadgeByName = (req, res) => {
    MeritBadgeModel.findOne({name: req.params.name}).lean().exec( (err, meritBadge) => {
        if(err){
            console.log('Error getting Merit Badge: ', err);
            res.status(500).send('Error getting Merit Badge');
        } else {
            res.status(200).send(meritBadge);
        }
    });
};

module.exports.getAllClassrooms = (req, res) => {
    ClassroomModel.find({}).lean().exec( (err, classrooms) => {
        if(err){
            console.log('Error getting classrooms: ', err);
            res.status(500).send('Error getting classrooms');
        } else {
            res.status(200).send(classrooms);
        }
    });
};