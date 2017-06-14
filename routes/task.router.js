var express = require('express');
var logger = require('./../lib/logger');
var router = express.Router();
var Task = require('../models/task.model.js');
const uuid = require('uuid/v4');


router.get('/:id*?', function (req, res) {
    console.log('Headers: ' + JSON.stringify(req.headers, null, 4));
    if (req.params.id) {
        Task.find({
            id: req.params.id
        }, function (err, result) {
            res.json(result);
        });
    } else {
        Task.find(function (err, result) {
            res.json(result);
        }).sort({
            id: 1
        });
    }
});


router.post('/', function (req, res, next) {
    var task = req.body;
    if (!task.id) {
        task.id = uuid();
    }
    Task.create(task, function (err, item) {
        res.status(200).send(task.id);
        if (next) next();
    });
});

router.delete('/:id', function (req, res, next) {
    var id = req.params.id;
    if (id) {
        Task.remove({
            id: id
        }, function (err, result) {
            if (err)
                res.send(err);
            else {
                res.status(200).send();
                if (next) next();
            }
        });
    }
});

router.put('/:id', function (req, res, next) {
    var task = req.body;
    var id = req.params.id;
    Task.update({
        id: id
    }, task, function (err, result) {
        res.status(200).send();
        if (next) next();
    });
});

module.exports = router;
