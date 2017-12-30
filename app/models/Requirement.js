'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SubRequirement = require('./SubRequirement');

const Requirement = new Schema({
    number: Number,
    description: String,
    note: String,
    subRequirements: [SubRequirement]
});

module.exports.Requirement = Requirement;