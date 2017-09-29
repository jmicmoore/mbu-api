const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const http = require('superagent');
const async = require('async');

const MERIT_BADGE_LIST_URL = 'https://meritbadge.org/wiki/index.php/Merit_Badges';
const BASE_URL = 'https://meritbadge.org';
const IMAGE_RELATIVE_PATH = '/images';

module.exports.getMeritBadgesFromWeb = () => {

    async.waterfall([
        (next) => {
            console.log('Gathering merit badge urls...');
            getMeritBadgeInfoList(MERIT_BADGE_LIST_URL, next);
        },
        getMeritBadges,
        (meritBadges, next) => {
            console.log('Saving related images...');
            saveImages(meritBadges, next);
        },
        (meritBadges, next) => {
            console.log('Saving merit badge json file...');
            saveJsonFile(meritBadges, next);
        }
    ], (err, result) => {
        if(err){
            console.log("Error during merit badge load from web: ", err);
        } else {
            console.log('Merit badges loaded successfully from web');
        }
    });
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
            let meritBadgeInfoList = badges.map(function(i, el){
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

const meritBadgeValid = (meritBadge) => {
    let valid = true;
    if(meritBadge.requirements.length <= 1){
        console.log('Requirements did not parse correctly for ' + meritBadge.name);
        valid = false;
    }
    try {
        const jsonString = JSON.stringify(meritBadge);
    } catch (err) {
        console.log('Detected circular reference for ' + meritBadge.name, err);
        valid = false;
    }

    if(valid){
        console.log("Successfully parsed merit badge for: " + meritBadge.name);
    } else {
        console.log("Issues with parsing merit badge for: " + meritBadge.name + " - skipping");
    }
    return valid;
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

            if(meritBadgeValid(meritBadge)){
                meritBadgeJsonList.push(meritBadge);
            }

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

const mapImageName = (originalFileName) => {
    switch(originalFileName){
        case '200px-Mining_in_Society.jpg':
            return 'Mining_in_Society.jpg';
        case '200px-Scuba_Diving.jpg':
            return 'Scuba_Diving.jpg';
        case '200px-Signs%2C_Signals%2C_and_Codes.jpg':
            return 'Signs_Signals_and_Codes.jpg';
        case 'Search_%26_Rescue.jpg':
            return 'Search_and_Rescue.jpg';
        default:
            return originalFileName;
    };
}

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
            const originalFilename = originalImageUrl.slice(originalImageUrl.lastIndexOf('/')+1);
            const filename = mapImageName(originalFilename);

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

    const requirementsTable = $("#toc").nextAll('table').eq(1);

    const getSubRequirements = function(element){
        return $(element).find('dd').map(function(i, el){
            const subRequirement = $(this).text().trim();
            return {
                part: subRequirement.slice(0, 1),
                text: subRequirement.slice(3)
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
        }).get();
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

const saveJsonFile = (meritBadges, next) => {
    const localFilepath = path.join(__dirname, 'meritBadges.json');
    fs.writeFileSync(localFilepath, JSON.stringify(meritBadges), 'utf8');
    next(null, meritBadges);
};

this.getMeritBadgesFromWeb();