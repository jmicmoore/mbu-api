const MeritBadgeModel = require('../models/MeritBadge').MeritBadge;
const ClassroomModel = require('../models/Classroom');
const factory = require('../models/modelFactory');
const CourseModel = require('../models/Course');

module.exports.createMeritBadge = (req, res) => {
    const meritBadge = req.body;
    const NewMeritBadge = factory.createMeritBadgeModel(meritBadge);

    NewMeritBadge.save( (err, doc) => {
        if(err){
            console.log('Error saving Merit Badge: ', err);
            res.status(500).send('Error saving Merit Badge');
        } else {
            res.status(200).send('Merit Badge saved successfully');
        }
    });
};

module.exports.updateMeritBadge = (req, res) => {
    const meritBadge = req.body;

    MeritBadgeModel.findByIdAndUpdate(meritBadge.id, meritBadge, (err, doc) => {
        if(err){
            console.log('Error updating Merit Badge: ', err);
            res.status(500).send('Error updating Merit Badge');
        } else {
            res.status(200).send('Merit Badge updated successfully');
        }
    });
};

module.exports.deleteMeritBadge = (req, res) => {
    const meritBadgeId = req.params.id;

    MeritBadgeModel.findByIdAndRemove(meritBadgeId, (err) => {
        if(err){
            console.log('Error deleting Merit Badge: ', err);
            res.status(500).send('Error deleting Merit Badge');
        } else {
            res.status(200).send('Merit Badge deleted successfully');
        }
    });
};

module.exports.createClassroom = (req, res) => {
    const model = new ClassroomModel(req.body);
    model.save( (err, doc) => {
        if(err){
            console.log('Error saving Classroom: ', err);
            res.status(500).send('Error saving Classroom');
        } else {
            res.status(200).send('Classroom saved successfully');
        }
    });
};

module.exports.deleteClassroom = (req, res) => {
    const classroomId = req.params.id;

    ClassroomModel.findByIdAndRemove(classroomId, (err) => {
        if(err){
            console.log('Error deleting Classroom: ', err);
            res.status(500).send('Error deleting Classroom');
        } else {
            res.status(200).send('Classroom deleted successfully');
        }
    });
};

module.exports.createCourse = (req, res) => {
    const model = new CourseModel(req.body);
    model.save( (err, doc) => {
        if(err){
            console.log('Error saving Course: ', err);
            res.status(500).send('Error saving Course');
        } else {
            res.status(200).send('Course saved successfully');
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