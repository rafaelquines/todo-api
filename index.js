"use strict";
var cors = require('cors');
var logger = require('./lib/logger');
var config = require('./config.json');
var express = require('express');
var bodyParser = require('body-parser');
var Task = require('./models/task.model');
var taskRouter = require('./routes/task.router');
var router = express.Router();
var app = express();

function initRestServer() {
    logger.info("Initializing Rest Server");
    app.use(function (req, res, next) {
        logger.info('Rest ' + req.method + ' Request on ' + req.originalUrl);
        next();
    });
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    // app.use(function (req, res, next) {
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
    //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //     next();
    // });
    app.use('/task', taskRouter);
    app.listen(config.restserver.port, function () {
        logger.info('Rest Server started on port ' + config.restserver.port);
    });

}

function initDB() {
    logger.info("Initializing database");
    var mongoose = require('mongoose');
    mongoose.Promise = global.Promise;
    return mongoose.connect(config.mongodb.url);
}

function init() {
    logger.info('Service started');
    initDB();
    initRestServer();
}

init();