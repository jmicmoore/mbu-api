'use strict';

const mongoose = require('mongoose');
const Classroom = require('./Classroom');
const Course = require('./Course');
const MeritBadge = require('./MeritBadge');
const Requirement = require('./Requirement');
const ScheduledCourse = require('./ScheduledCourse');
const Student = require('./Student');
const SubRequirement = require('./SubRequirement');
const User = require('./User');
const UserProfile = require('./UserProfile');

module.exports.ClassroomModel = mongoose.model('Classroom', Classroom);
module.exports.CourseModel = mongoose.model('Course', Course);
module.exports.MeritBadgeModel = mongoose.model('MeritBadge', MeritBadge);
module.exports.RequirementModel = mongoose.model('Requirement', Requirement);
module.exports.ScheduledCourseModel = mongoose.model('ScheduledCourse', ScheduledCourse);
module.exports.StudentModel = mongoose.model('Student', Student);
module.exports.SubRequirementModel = mongoose.model('SubRequirement', SubRequirement);
module.exports.UserModel = mongoose.model('User', User);
module.exports.UserProfileModel = mongoose.model('UserProfile', UserProfile);


