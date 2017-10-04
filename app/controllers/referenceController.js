const profileTypes = require('../../db-init/profile_types.json');
const councils = require('../../db-init/councils.json');
const districts = require('../../db-init/districts.json');
const MeritBadgeModel = require('../models/MeritBadge').MeritBadge;
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

module.exports.getMeritBadge = (req, res) => {
    MeritBadgeModel.findById(req.params.id).lean().exec( (err, meritBadge) => {
        if(err){
            console.log('Error getting Merit Badge: ', err);
            res.status(500).send('Error getting Merit Badge');
        } else {
            res.status(200).send(meritBadge);
        }
    });
};