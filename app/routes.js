const express = require('express');
const router = express.Router();
const referenceController = require('./controllers/referenceController');
const meritBadgeController = require('./controllers/meritBadgeController');
const classroomController = require('./controllers/classroomController');
const courseController = require('./controllers/courseController');
const scheduledCourseController = require('./controllers/scheduledCourseController');
const userController = require('./controllers/userController');

router.get('/version', (req, res) => {
    res.status(200).send('1.2.3');
});

// Reference
router.get('/profile-types', referenceController.getProfileTypes);
router.get('/councils', referenceController.getCouncils);
router.get('/districts', referenceController.getDistricts);
router.get('/states', referenceController.getStates);

// Merit Badges
router.get('/merit-badge-names', meritBadgeController.getMeritBadgeNames);
router.get('/merit-badges', meritBadgeController.getAllMeritBadges);
router.get('/merit-badges/:name', meritBadgeController.getMeritBadgeByName);
router.post('/merit-badges', meritBadgeController.createMeritBadge);
router.put('/merit-badges', meritBadgeController.updateMeritBadge);
router.delete('/merit-badges/:id', meritBadgeController.deleteMeritBadge);

// Classrooms
router.get('/classrooms', classroomController.getAllClassrooms);
router.post('/classrooms', classroomController.createClassroom);
router.delete('/classrooms/:id', classroomController.deleteClassroom);

// Courses
router.get('/courses/:id', courseController.getCourseById);
router.get('/courses', courseController.getCourses);
router.put('/courses', courseController.updateCourse);
router.delete('/courses/:id', courseController.deleteCourse);

// Scheduled Courses
router.get('/scheduled-courses', scheduledCourseController.getScheduledCourses);
router.post('/scheduled-courses', scheduledCourseController.createScheduledCourse);
router.delete('/scheduled-courses/:id', scheduledCourseController.deleteScheduledCourse);

// Users
router.post('/profiles', userController.createProfile);
router.put('/profiles', userController.updateProfile);
router.get('/profiles/:email', userController.getProfile);
router.get('/counselor-names', userController.getCounselorNames);
router.post('/login', userController.login);

module.exports = router;

