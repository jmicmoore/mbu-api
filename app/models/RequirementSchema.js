'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SubRequirementSchema = require('./SubRequirementSchema');

const Requirement = new Schema({
    number: Number,
    description: String,
    note: String,
    subRequirements: [SubRequirementSchema]
});

module.exports = Requirement;