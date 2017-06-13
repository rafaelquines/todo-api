var logger = require('./../lib/logger');
var Mongoose = require('mongoose');
var taskSchema = new Mongoose.Schema({
    id: String,
    description: String,
    creationDate: Date,
    status: String
});

var Task = Mongoose.model('Task', taskSchema);

module.exports = Task;
