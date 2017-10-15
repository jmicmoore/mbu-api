const MeritBadgeModel = require('../models/MeritBadge').MeritBadge;
const factory = require('../models/modelFactory');

module.exports.getMeritBadgeNames = (req, res) => {
    MeritBadgeModel.find({}, 'name').lean().exec( (err, meritBadgeNames) => {
        if(err){
            console.log('Error getting Merit Badge names: ', err);
            res.status(500).send('Error getting Merit Badge names');
        } else {
            res.status(200).send(meritBadgeNames);
        }
    });
};

module.exports.getAllMeritBadges = (req, res) => {
    MeritBadgeModel.find({}).lean().exec( (err, meritBadges) => {
        if(err){
            console.log('Error getting Merit Badges: ', err);
            res.status(500).send('Error getting Merit Badges');
        } else {
            res.status(200).send(meritBadges);
        }
    });
};

module.exports.getMeritBadgeByName = (req, res) => {
    MeritBadgeModel.findOne({name: req.params.name}).lean().exec( (err, meritBadge) => {
        if(err){
            console.log('Error getting Merit Badge: ', err);
            res.status(500).send('Error getting Merit Badge');
        } else {
            res.status(200).send(meritBadge);
        }
    });
};

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

    MeritBadgeModel.findByIdAndUpdate(meritBadge._id, meritBadge, (err, doc) => {
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