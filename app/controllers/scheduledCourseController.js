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
