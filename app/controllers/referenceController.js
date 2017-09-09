const profileTypes = require('../../db-init/profile_types.json');

module.exports.getProfileTypes = (req, res) => {
    res.status(200).send(profileTypes);
};

