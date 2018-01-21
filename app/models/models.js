'use strict';

const mongoose = require('mongoose');
const Classroom = require('./Classroom');
const Course = require('./Course');
const ScheduledCourse = require('./ScheduledCourse');
const RegisteredCourse = require('./RegisteredCourse');
const MeritBadge = require('./MeritBadge');
const Requirement = require('./Requirement');
const Student = require('./Student');
const SubRequirement = require('./SubRequirement');
const User = require('./User');
const UserProfile = require('./UserProfile');

module.exports.ClassroomModel = mongoose.model('Classroom', Classroom);
module.exports.CourseModel = mongoose.model('Course', Course);
module.exports.ScheduledCourseModel = mongoose.model('ScheduledCourse', ScheduledCourse);
module.exports.RegisteredCourseModel = mongoose.model('RegisteredCourse', RegisteredCourse);
module.exports.MeritBadgeModel = mongoose.model('MeritBadge', MeritBadge);
module.exports.RequirementModel = mongoose.model('Requirement', Requirement);
module.exports.StudentModel = mongoose.model('Student', Student);
module.exports.SubRequirementModel = mongoose.model('SubRequirement', SubRequirement);
module.exports.UserModel = mongoose.model('User', User);
module.exports.UserProfileModel = mongoose.model('UserProfile', UserProfile);


