const _ = require('lodash');
const MeritBadgeModel = require('./MeritBadge');
const RequirementModel = require('./Requirement');
const SubRequirementModel = require('./SubRequirement');

module.exports.createMeritBadgeModel = (meritBadge) => {
    const meritBadgeModel = new MeritBadgeModel(meritBadge);
    meritBadgeModel.requirements = _.map(meritBadge.requirements, requirement => {

        const requirementModel = new RequirementModel(requirement);
        requirementModel.subRequirements = _.map(requirement.subRequirements, sub => {
            return new SubRequirementModel(sub);
        });
        return requirementModel;

    });
    return meritBadgeModel;
};
