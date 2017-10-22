const venturingClassNames = require('../../db-init/venturingClassNames.json');

module.exports.getClassNames = (req, res) => {
    res.status(200).send(venturingClassNames);
};
