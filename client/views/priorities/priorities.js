/* jshint camelcase:false */

(function(){
  'use strict';

  angular.module('quick-task')
  .controller('PrioritiesCtrl', ['$scope', 'Priority', function($scope, Priority){
    $scope.title = 'Priorities';
    $scope.sort = 'value';
    $scope.priority = {color:'#aaaaaa'};
    $scope.priorities = [];

    Priority.all().then(function(response){
      $scope.priorities = response.data.priorities;
    });

    $scope.add = function(){
      // Priority.create comes from the priority FACTORY, NOT the model
      // $scope.priority comes from the FORM
      Priority.create($scope.priority).then(function(response){
        $scope.priorities.push(response.data.priority);
        $scope.priority = {};
      });
    };
  }]);
})();
