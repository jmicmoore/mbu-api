const mongoose = require('mongoose');
const ScheduledCourseModel = require('../models/ScheduledCourse');

module.exports.getScheduledCourses = (req, res) => {
    ScheduledCourseModel.find({}).lean().exec( (err, courses) => {
        if(err){
            console.log('Error getting scheduled courses: ', err);
            res.status(500).send('Error getting scheduled courses');
        } else {
            res.status(200).send(courses);
        }
    });
};

module.exports.getScheduledCourseById = (req, res) => {
    const courseId = req.params.id;
    ScheduledCourseModel.findById(courseId).lean().exec( (err, course) => {
        if(err){
            console.log('Error getting scheduled course by id: ', err);
            res.status(500).send('Error getting scheduled course by id');
        } else {
            res.status(200).send(course);
        }
    });
};

module.exports.updateScheduledCourse = (req, res) => {
    const scheduledCourse = req.body;
    const scheduledCourseId = scheduledCourse._id || new mongoose.Types.ObjectId;
    scheduledCourse.lastModified = new Date();

    ScheduledCourseModel.findByIdAndUpdate(scheduledCourseId, scheduledCourse, {upsert: true}, (err, doc) => {
        if(err){
            console.log('Error updating Scheduled Course: ', err);
            res.status(500).send('Error updating Scheduled Course');
        } else {
            res.status(200).send('Scheduled Course updated successfully');
        }
    });
};

module.exports.deleteScheduledCourse = (req, res) => {
    const scheduledCourseId = req.params.id;
    ScheduledCourseModel.findByIdAndRemove(scheduledCourseId, (err) => {
        if(err){
            console.log('Error deleting scheduled course: ', err);
            res.status(500).send('Error deleting scheduled course');
        } else {
            res.status(200).send('Scheduled course deleted successfully');
        }
    });
};