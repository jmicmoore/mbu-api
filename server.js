require('dotenv').config(); // reads .env file
const express = require('express');
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
    } else {
        console.log('Connected to Mongo');

        app.use((req, res, next) =>{
            console.info("userId=" + req.userId + ", Method=" + req.method + ", Request=" + req.protocol + "://" + req.get('host') + req.originalUrl);
            next();
        });

        app.use(baseUrl, routes);
        app.listen(port, function() {
            console.log('MBU mock API listening on port: ', port);
        });
    }
});