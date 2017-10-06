const express = require('express');
const router = express.Router();
const referenceController = require('./controllers/referenceController');
const adminController = require('./controllers/adminController');
const userController = require('./controllers/userController');

router.get('/version', (req, res) => {
    res.status(200).send('1.2.3');
});

router.get('/profile-types', referenceController.getProfileTypes);
router.get('/councils', referenceController.getCouncils);
router.get('/districts', referenceController.getDistricts);
router.get('/states', referenceController.getStates);

router.get('/merit-badges', referenceController.getAllMeritBadges);
router.get('/merit-badges/:id', referenceController.getMeritBadge);
router.get('/classrooms', referenceController.getAllClassrooms);


router.post('/merit-badges', adminController.createMeritBadge);
router.put('/merit-badges/:id', adminController.updateMeritBadge);
router.delete('/merit-badges/:id', adminController.deleteMeritBadge);

router.post('/classrooms', adminController.createClassroom);
router.delete('/classrooms/:id', adminController.deleteClassroom);

router.post('/profiles', userController.createProfile);
router.put('/profiles', userController.updateProfile);
router.get('/profiles/:email', userController.getProfile);

router.post('/login', userController.login);

module.exports = router;

