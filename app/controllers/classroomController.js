const ClassroomModel = require('../models/Classroom');

module.exports.getAllClassrooms = (req, res) => {
    ClassroomModel.find({}).lean().exec( (err, classrooms) => {
        if(err){
            console.log('Error getting classrooms: ', err);
            res.status(500).send('Error getting classrooms');
        } else {
            res.status(200).send(classrooms);
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