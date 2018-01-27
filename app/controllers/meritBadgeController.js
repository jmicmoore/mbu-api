const mongoose = require('mongoose');
const MeritBadgeModel = require('../models/models').MeritBadge;
const factory = require('../models/modelFactory');
const log = require('log4js').getLogger('meritBadgeController');

module.exports.getMeritBadgeNames = (req, res) => {
    MeritBadgeModel.find({}, 'name').lean().exec( (err, meritBadgeNames) => {
        if(err){
            log.error('Error getting Merit Badge names: ', err);
            res.status(500).send('Error getting Merit Badge names');
        } else {
            res.status(200).send(meritBadgeNames);
        }
    });
};

module.exports.getAllMeritBadges = (req, res) => {
    MeritBadgeModel.find({}).lean().exec( (err, meritBadges) => {
        if(err){
            log.error('Error getting Merit Badges: ', err);
            res.status(500).send('Error getting Merit Badges');
        } else {
            res.status(200).send(meritBadges);
        }
    });
};

module.exports.getMeritBadgeById = (req, res) => {
    MeritBadgeModel.findById(req.params.id).lean().exec( (err, meritBadge) => {
        if(err){
            log.error('Error getting Merit Badge by id: ', err);
            res.status(500).send('Error getting Merit Badge by id');
        } else {
            res.status(200).send(meritBadge);
        }
    });
};

module.exports.getMeritBadgeByName = (req, res) => {
    MeritBadgeModel.findOne({name: req.params.name}).lean().exec( (err, meritBadge) => {
        if(err){
            log.error('Error getting Merit Badge by name: ', err);
            res.status(500).send('Error getting Merit Badge by name');
        } else {
            res.status(200).send(meritBadge);
        }
    });
};

module.exports.createMeritBadge = (req, res) => {
    const meritBadge = req.body;
    const NewMeritBadge = factory.createMeritBadgeModel(meritBadge);

    NewMeritBadge.save( (err) => {
        if(err){
            log.error('Error saving Merit Badge: ', err);
            res.status(500).send('Error saving Merit Badge');
        } else {
            res.status(200).send('Merit Badge saved successfully');
        }
    });
};

module.exports.updateMeritBadge = (req, res) => {
    const meritBadge = req.body;
    const meritBadgeId = meritBadge._id || new mongoose.Types.ObjectId;
    meritBadge.lastModified = new Date();

    MeritBadgeModel.findByIdAndUpdate(meritBadgeId, meritBadge, {upsert: true}, (err) => {
        if(err){
            log.error('Error updating Merit Badge: ', err);
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
            log.error('Error deleting Merit Badge: ', err);
            res.status(500).send('Error deleting Merit Badge');
        } else {
            res.status(200).send('Merit Badge deleted successfully');
        }
    });
};