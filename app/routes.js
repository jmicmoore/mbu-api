const express = require('express');
const router = express.Router();
const referenceController = require('./controllers/referenceController');
const userController = require('./controllers/userController');

router.get('/version', (req, res) => {
    res.status(200).send('1.2.3');
});

router.get('/profile-types', referenceController.getProfileTypes);

router.get('/councils', referenceController.getCouncils);

router.get('/districts', referenceController.getDistricts);

router.post('/profiles', userController.createProfile);

module.exports = router;

