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