'use strict';

var Mongo = require('mongodb');

function Task(o){
  this.name       = o.name;
  this.due        = new Date(o.due);
  this.isComplete = false;
  this.tags       = o.tags.split(',').map(function(t){return t.trim();});
  this.priorityId = Mongo.ObjectID(o.priorityId);
}

Object.defineProperty(Task, 'collection', {
  get: function(){return global.mongodb.collection('tasks');}
});

Task.create = function(o, cb){
  var t = new Task(o);
  Task.collection.save(t, cb);
};

Task.all = function(cb){
  Task.collection.find().toArray(cb);
};

module.exports = Task;
