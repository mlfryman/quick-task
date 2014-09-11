'use strict';

function Priority(o){
  this.name  = o.name;
  this.value = o.value * 1;
  this.color = o.color;
}

Object.defineProperty(Priority, 'collection', {
  get: function(){return global.mongodb.collection('priorities');}
});

Priority.create = function(o, cb){
  var p = new Priority(o);
  Priority.collection.save(p, cb);
};

Priority.all = function(cb){
  Priority.collection.find().toArray(cb);
};

Priority.findById = function(id, cb){
  Priority.collection.findOne({_id:id}, cb);
};

module.exports = Priority;
