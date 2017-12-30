require('dotenv').config(); // reads .env file
const fs = require('fs');
const https = require('https');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const log4js = require('log4js');
const mongoose = require('mongoose');
const routes = require('./app/routes');
const passport = require('./app/auth/passport');

const keyfilesPath = process.env.KEYFILES_PATH;
const privateKey = fs.readFileSync( path.join(keyfilesPath, 'mbu-server-key.pem'));
const publicCert = fs.readFileSync( path.join(keyfilesPath, 'mbu-fullchain-cert.pem'));
const clientCert = fs.readFileSync( path.join(keyfilesPath, 'mbu-fullchain-cert.pem'));
const passphrase = process.env.SERVER_KEY_PASSPHRASE;
const sslOptions = {
    key: privateKey,
    passphrase: passphrase,
    cert: publicCert,
    requestCert: true,
    ca: [ clientCert ]
};

const port = process.env.PORT || 3099;
const securePort = process.env.SECURE_PORT || 8443;

const mongoUrl =  process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/mbu-db';
const baseUrl = '/mbu-api';

const loggingConfig = {
    appenders : {
        stdout : {
            type: 'stdout',
            layout: {
                type: 'pattern',
                pattern: 'log_level="%p" app="%x{app}" app_env="%x{deploymentEnvironment}" category="%c" message="%m"',
                tokens: {
                    app: 'MERIT-BADGE-UNIVERSITY-API',
                    deploymentEnvironment: process.env.NODE_ENV ? process.env.NODE_ENV : 'local'
                }
            }
        }
    },
    categories : {
        default : {appenders: ['stdout'], level: 'info'}
    },
    replaceConsole: true
};

log4js.configure(loggingConfig, {});
const log = log4js.getLogger('server');

mongoose.connect(mongoUrl, (err) => {
    if (err) {
        log.error('Error!  Could not connect to MongoDB!', err);
        process.exit(0);
    }

    log.info('Connected to Mongo');

    if (process.env.NODE_ENV !== 'production') {
        log.info('setting up CORS middle-ware');
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Headers', 'origin, content-type, accept, Access-Control-Allow-Origin');
            res.header('Access-Control-Allow-Origin', req.header('origin'));
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS,DELETE');
            res.header('Access-Control-Allow-Credentials', true);
            next();
        });
    }

    app.use((req, res, next) => {
        log.info('userId=' + req.userId + ', Method=' + req.method + ', Request=' + req.protocol + '://' + req.get('host') + req.originalUrl);
        next();
    });

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));

    // parse application/json
    app.use(bodyParser.json());

    app.use(passport.initialize());

    const imagePath = path.join(__dirname, 'app', 'images');
    app.use(baseUrl + '/images', express.static(imagePath));

    app.use(baseUrl, routes);

    // TODO: SSL stopped working - certificate probably expired.
    // See the README to get this working again when you get closer to deployment
    // https.createServer(sslOptions, app).listen(securePort, () => {
    //     console.log('MBU API listening on port:', securePort);
    // });
    app.listen(port, function() {
        log.info('MBU mock API listening on port:', port);
    });
});