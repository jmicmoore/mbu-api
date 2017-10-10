const MeritBadgeModel = require('../models/MeritBadge').MeritBadge;
const ClassroomModel = require('../models/Classroom');
const factory = require('../models/modelFactory');
const MbuClassModel = require('../models/MbuClass');

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
    const classroom = req.body;

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

module.exports.createClass = (req, res) => {
    const mbuClass = req.body;

    const model = new MbuClassModel(req.body);
    model.save( (err, doc) => {
        if(err){
            console.log('Error saving Class: ', err);
            res.status(500).send('Error saving Class');
        } else {
            res.status(200).send('Class saved successfully');
        }
    });
};