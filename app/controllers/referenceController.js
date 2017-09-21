const profileTypes = require('../../db-init/profile_types.json');
const councils = require('../../db-init/councils.json');
const districts = require('../../db-init/districts.json');
const MeritBadgeModel = require('../models/MeritBadge').MeritBadge;

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
    MeritBadgeModel.find({}).lean().exec(function (err, meritBadges) {
        if(err){
            console.log('Error getting Merit Badges');
            res.status(500).send('Error getting Merit Badges');
        } else {
            res.status(200).send(meritBadges);
        }
    });
};