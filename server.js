require('dotenv').config(); // reads .env file
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const routes = require('./app/routes');

const port = process.env.PORT || 3099;
const mongoUrl =  process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/mbu-db';
const baseUrl = '/mbu-api';

mongoose.connect(mongoUrl, (err) => {
    if (err) {
        console.error('Error!  Could not connect to MongoDB!', err);
        process.exit(0);
    }

    console.log('Connected to Mongo');

    if (process.env.NODE_ENV !== 'production') {
        console.log('setting up CORS middle-ware');
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Headers', 'origin, content-type, accept, Access-Control-Allow-Origin');
            res.header('Access-Control-Allow-Origin', req.header('origin'));
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS,DELETE');
            res.header('Access-Control-Allow-Credentials', true);
            next();
        });
    }

    app.use((req, res, next) =>{
        console.info("userId=" + req.userId + ", Method=" + req.method + ", Request=" + req.protocol + "://" + req.get('host') + req.originalUrl);
        next();
    });

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));

    // parse application/json
    app.use(bodyParser.json());

    app.use(baseUrl, routes);
    app.listen(port, function() {
        console.log('MBU mock API listening on port:', port);
    });
});