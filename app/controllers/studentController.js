const mongoose = require('mongoose');
const StudentModel = require('../models/models').StudentModel;
const log = require('log4js').getLogger('studentController');

module.exports.getStudents = (req, res) => {
    StudentModel.find({}).populate('courses').lean().exec( (err, students) => {
        if(err){
            log.error('Error getting students: ', err);
            res.status(500).send('Error getting students');
        } else {
            res.status(200).send(students);
        }
    });
};

module.exports.getStudentById = (req, res) => {
    const studentId = req.params.id;
    StudentModel.findById(studentId).populate('courses').lean().exec( (err, student) => {
        if(err){
            log.error('Error getting student by id: ', err);
            res.status(500).send('Error getting student by id');
        } else {
            res.status(200).send(student);
        }
    });
};

module.exports.updateStudent = (req, res) => {
    const student = req.body;
    const studentId = student._id || new mongoose.Types.ObjectId;
    student.lastModified = new Date();

    StudentModel.findByIdAndUpdate(studentId, student, {upsert: true}, (err) => {
        if(err){
            log.error('Error updating student: ', err);
            res.status(500).send('Error updating student');
        } else {
            res.status(200).send('student updated successfully');
        }
    });
};

module.exports.deleteStudent = (req, res) => {
    const studentId = req.params.id;
    StudentModel.findByIdAndRemove(studentId, (err) => {
        if(err){
            log.error('Error deleting student: ', err);
            res.status(500).send('Error deleting student');
        } else {
            res.status(200).send('student deleted successfully');
        }
    });
};