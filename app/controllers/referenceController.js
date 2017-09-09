const profileTypes = require('../../db-init/profile_types.json');
const councils = require('../../db-init/councils.json');

module.exports.getProfileTypes = (req, res) => {
    res.status(200).send(profileTypes);
};

module.exports.getCouncils = (req, res) => {
    res.status(200).send(councils);
};
