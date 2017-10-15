const profileTypes = require('../../db-init/profile_types.json');
const councils = require('../../db-init/councils.json');
const districts = require('../../db-init/districts.json');
const states = require('../../db-init/states.json');

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