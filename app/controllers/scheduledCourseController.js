const ScheduledCourseModel = require('../models/ScheduledCourse');

module.exports.createScheduledCourse = (req, res) => {
    const course = req.body;
    var model = new ScheduledCourseModel(req.body);
    model.save(course, (err, doc) => {
        if(err){
            console.log('Error saving Scheduled Course: ', err);
            res.status(500).send('Error saving Scheduled Course');
        } else {
            res.status(200).send('Scheduled Course saved successfully');
        }
    });
};

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