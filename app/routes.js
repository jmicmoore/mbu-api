const express = require('express');
const router = express.Router();
const referenceController = require('./controllers/referenceController');

router.get('/version', (req, res) => {
    res.status(200).send('1.2.3');
});

router.get('/profile-types', referenceController.getProfileTypes);

module.exports = router;

