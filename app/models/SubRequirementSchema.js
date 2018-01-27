'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubRequirement = new Schema({
    part: String,
    text: String,
    note: String
});

module.exports = SubRequirement;