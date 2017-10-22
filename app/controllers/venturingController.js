const venturingClasses = require('../../db-init/venturingClasses.json');

module.exports.getClasses = (req, res) => {
    res.status(200).send(venturingClasses);
};
