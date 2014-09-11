(function(){
  'use strict';

  angular.module('quick-task')
  // cap b/c it is like a Node controller
  .factory('Task', ['$http', function($http){

    // browser/Angular sends POST request to Node.js to save task object to DB
    function create(task){
      return $http.post('/tasks', task);
    }

    function all(){
      return $http.get('/tasks');
    }

    return {create:create, all:all};
  }]);
})();

