const express = require('express');
const router = express.Router();
const referenceController = require('./controllers/referenceController');
const meritBadgeController = require('./controllers/meritBadgeController');
const classroomController = require('./controllers/classroomController');
const courseController = require('./controllers/courseController');
const scheduledCourseController = require('./controllers/scheduledCourseController');
const registeredCourseController = require('./controllers/registeredCourseController');
const userProfileController = require('./controllers/userProfileController');
const userController = require('./controllers/userController');
const venturingController = require('./controllers/venturingController');

const studentController = require('./controllers/studentController');

const packageJson = require('../package.json');

router.get('/version', (req, res) => {
    res.status(200).send(packageJson.version);
});

// Reference
router.get('/profile-types', referenceController.getProfileTypes);
router.get('/councils', referenceController.getCouncils);
router.get('/districts', referenceController.getDistricts);
router.get('/states', referenceController.getStates);

// Merit Badges
router.get('/merit-badge-names', meritBadgeController.getMeritBadgeNames);
router.get('/merit-badges', meritBadgeController.getAllMeritBadges);
router.get('/merit-badges/:id', meritBadgeController.getMeritBadgeById);
router.get('/merit-badges-by-name/:name', meritBadgeController.getMeritBadgeByName);
router.post('/merit-badges', meritBadgeController.createMeritBadge);
router.put('/merit-badges', meritBadgeController.updateMeritBadge);
router.delete('/merit-badges/:id', meritBadgeController.deleteMeritBadge);

// Venturing Classes
router.get('/venturing-class-names', venturingController.getClassNames);

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
router.get('/scheduled-courses/:id', scheduledCourseController.getScheduledCourseById);
router.get('/scheduled-courses', scheduledCourseController.getScheduledCourses);
router.put('/scheduled-courses', scheduledCourseController.updateScheduledCourse);
router.delete('/scheduled-courses/:id', scheduledCourseController.deleteScheduledCourse);

// Registered Courses
router.get('/registered-courses/:id', registeredCourseController.getRegisteredCourseById);
router.get('/registered-courses', registeredCourseController.getRegisteredCourses);
router.put('/registered-courses', registeredCourseController.updateRegisteredCourse);
router.delete('/registered-courses/:id', registeredCourseController.deleteRegisteredCourse);

// User Profiles
router.put('/profiles', userProfileController.updateProfile);
router.get('/profiles/:userId', userProfileController.getProfileByUserId);
router.get('/counselor-names', userProfileController.getCounselorNames);

// Users
router.post('/register',
    userController.validateUniqueUserId,
    userController.register,
    userProfileController.createProfile);
router.post('/login', userController.login, userController.sendUserId);
router.get('/logout', userController.logout);

// Students
router.get('/students/:id', studentController.getStudentById);
router.get('/students', studentController.getStudents);
router.put('/students', studentController.updateStudent);
router.delete('/students/:id', studentController.deleteStudent);

module.exports = router;

