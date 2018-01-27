'use strict';

const mongoose = require('mongoose');
const ClassroomSchema = require('./ClassroomSchema');
const CourseSchema = require('./CourseSchema');
const ScheduledCourseSchema = require('./ScheduledCourseSchema');
const RegisteredCourseSchema = require('./RegisteredCourseSchema');
const MeritBadgeSchema = require('./MeritBadgeSchema');
const RequirementSchema = require('./RequirementSchema');
const StudentSchema = require('./StudentSchema');
const SubRequirementSchema = require('./SubRequirementSchema');
const UserSchema = require('./UserSchema');
const UserProfileSchema = require('./UserProfileSchema');

module.exports.Classroom = mongoose.model('Classroom', ClassroomSchema);
module.exports.Course = mongoose.model('Course', CourseSchema);
module.exports.ScheduledCourse = mongoose.model('ScheduledCourse', ScheduledCourseSchema);
module.exports.RegisteredCourse = mongoose.model('RegisteredCourse', RegisteredCourseSchema);
module.exports.MeritBadge = mongoose.model('MeritBadge', MeritBadgeSchema);
module.exports.Requirement = mongoose.model('Requirement', RequirementSchema);
module.exports.Student = mongoose.model('Student', StudentSchema);
module.exports.SubRequirement = mongoose.model('SubRequirement', SubRequirementSchema);
module.exports.User = mongoose.model('User', UserSchema);
module.exports.UserProfile = mongoose.model('UserProfile', UserProfileSchema);


