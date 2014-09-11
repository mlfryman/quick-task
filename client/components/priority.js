(function(){
  'use strict';

  angular.module('quick-task')
  // cap b/c it is like a Node controller
  .factory('Priority', ['$http', function($http){

    // browser/Angular sends POST request to Node.js to save priority object to DB
    function create(priority){
      return $http.post('/priorities', priority);
    }

    function all(){
      return $http.get('/priorities');
    }

    return {create:create, all:all};
  }]);
})();
