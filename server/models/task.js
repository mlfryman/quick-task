'use strict';

var Mongo    = require('mongodb'),
    async    = require('async'),
    Priority = require('./priority');

function Task(o){
  this.name       = o.name;
  this.dueDate    = new Date(o.dueDate);
  this.isComplete = false;
  this.priorityId = Mongo.ObjectID(o.priorityId);
}

Object.defineProperty(Task, 'collection', {
  get: function(){return global.mongodb.collection('tasks');}
});

Task.create = function(o, cb){
  var t = new Task(o);
  Task.collection.save(t, function(err, task){
    iterator(task, cb);
  });
};

Task.all = function(cb){
  Task.collection.find().toArray(function(err, tasks){
    async.map(tasks, iterator, cb);
  });
};

module.exports = Task;

// PRIVATE FUNCTIONS ///

function iterator(task, cb){
  Priority.findById(task.priorityId, function(err, priority){
    task.priority = priority;
    cb(null, task);
  });
}
