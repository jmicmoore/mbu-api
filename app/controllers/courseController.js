const mongoose = require('mongoose');
const CourseModel = require('../models/Course');

module.exports.getCourses = (req, res) => {
    CourseModel.find({}).lean().exec( (err, courses) => {
        if(err){
            console.log('Error getting courses: ', err);
            res.status(500).send('Error getting courses');
        } else {
            res.status(200).send(courses);
        }
    });
};

module.exports.getCourseById = (req, res) => {
    const courseId = req.params.id;
    CourseModel.findById(courseId).lean().exec( (err, course) => {
        if(err){
            console.log('Error getting course by id: ', err);
            res.status(500).send('Error getting course by id');
        } else {
            res.status(200).send(course);
        }
    });
};

module.exports.updateCourse = (req, res) => {
    const course = req.body;
    const courseId = course._id || new mongoose.Types.ObjectId;
    course.lastModified = new Date();

    CourseModel.findByIdAndUpdate(courseId, course, {upsert: true}, (err, doc) => {
        if(err){
            console.log('Error updating Course: ', err);
            res.status(500).send('Error updating Course');
        } else {
            res.status(200).send('Course updated successfully');
        }
    });
};

module.exports.deleteCourse = (req, res) => {
    const courseId = req.params.id;
    CourseModel.findByIdAndRemove(courseId, (err) => {
        if(err){
            console.log('Error deleting Course: ', err);
            res.status(500).send('Error deleting Course');
        } else {
            res.status(200).send('Course deleted successfully');
        }
    });
};