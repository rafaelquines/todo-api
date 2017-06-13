var logger = require('./../lib/logger');
var Mongoose = require('mongoose');
var taskSchema = new Mongoose.Schema({
    id: String,
    description: {
      type: String,
      default: ''
    },
    creationDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: [{
        type: String,
        enum: ['pending', 'ongoing', 'completed']
      }],
      default: ['pending']
    }
});

var Task = Mongoose.model('Task', taskSchema);

module.exports = Task;
