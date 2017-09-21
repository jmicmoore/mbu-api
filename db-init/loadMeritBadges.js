const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const cheerio = require('cheerio');
const http = require('superagent');
const async = require('async');
const mongoose = require('mongoose');
const MeritBadgeModel = require('../app/models/MeritBadge').MeritBadge;
const RequirementModel = require('../app/models/MeritBadge').Requirement;
const SubRequirementModel = require('../app/models/MeritBadge').SubRequirement;

const MONGO_URL = 'mongodb://localhost/mbu-db';
const MERIT_BADGE_LIST_URL = 'https://meritbadge.org/wiki/index.php/Merit_Badges';
const BASE_URL = 'https://meritbadge.org';
const IMAGE_RELATIVE_PATH = '/images';

module.exports.loadMeritBadges = () => {

    async.waterfall([
        (next) => {
            connectToMongo(MONGO_URL, next);
        },
        (next) => {
            console.log('Gathering merit badge urls...');
            getMeritBadgeInfoList(MERIT_BADGE_LIST_URL, next);
        },
        getMeritBadges,
        (meritBadges, next) => {
            console.log('Saving related images...');
            saveImages(meritBadges, next);
        },
        convertToModels,
        (meritBadgeModels, next) => {
            console.log('Saving merit badges...');
            saveMeritBadges(meritBadgeModels, next);
        },
        disconnectFromMongo
    ], (err, result) => {
        if(err){
            console.log("Error during merit badge load: ", err);
        } else {
            console.log('Merit badges loaded successfully');
        }
    });
};

const connectToMongo = (mongoUrl, next) => {
    mongoose.connect(mongoUrl, next);
};

const getMeritBadgeInfoList = (url, next) => {

    http.get(url).end(function(err, res) {
        if (err) {
            console.log("Error happened ", err);
            callback(err);
        } else {
            if(res.type !== 'text/html'){
                console.log('Error!  Can only process HTML');
                return;
            }

            const $ = cheerio.load(res.text);

            const badges = $("#bodyContent").find('ol').first().children('li');
            const meritBadgeInfoList = badges.map(function(i, el){
                return {
                    url: BASE_URL + $(this).find('a').attr('href').trim(),
                    eagleRequired: $(this).children().is('i'),
                    name: $(this).find('a').text().trim()
                };
            }).get();
            next(null, meritBadgeInfoList);
        }
    });
};

const getMeritBadges = (meritBadgeInfoList, next) => {

    const meritBadgeJsonList = [];

    async.eachSeries(meritBadgeInfoList, (meritBadgeInfo, eachCallback) => {
        getDataFromSite(meritBadgeInfo.url, (err, meritBadge) => {
            if(err){
                console.log("Error getting merit badge for: ", meritBadgeInfo.name);
                eachCallback(err);
                return;
            }

            meritBadge.name = meritBadgeInfo.name;
            meritBadge.eagleRequired = meritBadgeInfo.eagleRequired;
            meritBadgeJsonList.push(meritBadge);

            console.log("Parsed merit badge for: " + meritBadgeInfo.name);
            eachCallback();
        });
    }, (err) => {
        if(err){
            console.log("Error getting merit badges: ", err);
            next(err);
        } else {
            next(null, meritBadgeJsonList);
        }
    });

};

const getDataFromSite = (url, callback) => {
    http.get(url).end(function(err, res){
        if(err){
            callback(err);
        } else {
            if(res.type !== 'text/html'){
                callback('Error!  Can only process HTML');
                return;
            }

            const originalImageUrl = getImageFromResponse(res.text);
            const filename = originalImageUrl.slice(originalImageUrl.lastIndexOf('/')+1);

            const meritBadge = {
                requirements: getRequirementsFromResponse(res.text),
                originalImageUrl: originalImageUrl,
                imageUrl: path.join(IMAGE_RELATIVE_PATH, filename)
            };
            callback(null, meritBadge);
        }
    });
};

const getRequirementsFromResponse = (html) => {
    const $ = cheerio.load(html);

    const requirementsTable = $("#bodyContent").children('table').eq(3);

    const getSubRequirements = function(element){
        return $(element).find('dd').map(function(i, el){
            const subRequirement = $(this).text().trim();
            return {
                part: subRequirement.slice(0, 1),
                description: subRequirement.slice(3)
            }


        }).get();
    };

    const getRequirements = function(element){
        return $(element).find('ol').children('li').map(function(i, el) {
            const number = i + 1;
            const description = $(this).text().split('\n')[0].trim();
            const subRequirements = getSubRequirements(this);

            return {
                number: number,
                description: description,
                subRequirements: subRequirements
            };
        });
    };

    return getRequirements(requirementsTable);
};

const getImageFromResponse = (html) => {
    const $ = cheerio.load(html);

    var imageTable = $("#toc").prev('table');
    const relativeUrl = $(imageTable).find('img').attr('src').trim();
    return BASE_URL + relativeUrl;
};

const saveImages = (meritBadges, next) => {
    async.each(meritBadges, (badge, eachCallback) => {

        const filename = badge.originalImageUrl.slice(badge.originalImageUrl.lastIndexOf('/')+1);
        const localFilepath = path.join(__dirname, 'images', filename);

        const stream = fs.createWriteStream(localFilepath);
        const req = http.get(badge.originalImageUrl);
        req.pipe(stream);

        eachCallback(null);
    }, (err) => {
        if(err){
            next(err);
        } else {
            next(null, meritBadges);
        }
    });
};

const convertToModels = (meritBadges, next) => {

    const meritBadgeModels = _.map(meritBadges, meritBadge => {

        const meritBadgeModel = new MeritBadgeModel(meritBadge);
        meritBadgeModel.requirements = _.map(meritBadge.requirements, requirement => {

            const requirementModel = new RequirementModel(requirement);
            requirementModel.subRequirements = _.map(requirement.subRequirements, sub => {
                return new SubRequirementModel(sub);
            });
            return requirementModel;

        });
        return meritBadgeModel;
    });
    next(null, meritBadgeModels);
};

const saveMeritBadges = (meritBadgeModels, next) => {
    MeritBadgeModel.insertMany(meritBadgeModels, function(err, docs) {
        if(err){
            next(err);
        } else {
            next(null);
        }
    });
};

const disconnectFromMongo = (next) => {
    mongoose.connection.close((err) => {
        next(err);
    });
};

this.loadMeritBadges();