const mongoose = require('mongoose');
const RegisteredCourseModel = require('../models/models').RegisteredCourseModel;
const log = require('log4js').getLogger('completedCourseController');

module.exports.getRegisteredCourses = (req, res) => {
    RegisteredCourseModel.find({})
        .populate('student')
        .populate('course')
        .populate('completedRequirements')
        .lean().exec( (err, courses) => {
            if(err){
                log.error('Error getting registered courses: ', err);
                res.status(500).send('Error getting registered courses');
            } else {
                res.status(200).send(courses);
            }
        });
};

module.exports.getRegisteredCourseById = (req, res) => {
    const courseId = req.params.id;
    RegisteredCourseModel.findById(courseId)
        .populate('student')
        .populate('course')
        .populate('completedRequirements')
        .lean().exec( (err, course) => {
            if(err){
                log.error('Error getting registered course by id: ', err);
                res.status(500).send('Error getting registered course by id');
            } else {
                res.status(200).send(course);
            }
        });
};

module.exports.updateRegisteredCourse = (req, res) => {
    const registeredCourse = req.body;
    const registeredCourseId = registeredCourse._id || new mongoose.Types.ObjectId;
    registeredCourse.lastModified = new Date();

    RegisteredCourseModel.findByIdAndUpdate(registeredCourseId, registeredCourse, {upsert: true}, (err) => {
        if(err){
            log.error('Error updating registered course: ', err);
            res.status(500).send('Error updating registered course');
        } else {
            res.status(200).send('Registered course updated successfully');
        }
    });
};

module.exports.deleteRegisteredCourse = (req, res) => {
    const registeredCourseId = req.params.id;
    RegisteredCourseModel.findByIdAndRemove(registeredCourseId, (err) => {
        if(err){
            log.error('Error deleting registered course: ', err);
            res.status(500).send('Error deleting registered course');
        } else {
            res.status(200).send('Registered course deleted successfully');
        }
    });
};