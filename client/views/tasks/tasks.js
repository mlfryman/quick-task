/* jshint camelcase:false */

(function(){
  'use strict';

  angular.module('quick-task')
  .controller('TasksCtrl', ['$scope', 'Task', 'Priority', function($scope, Task, Priority){
    $scope.title = 'Tasks';
    $scope.sort = 'priority.value';
    $scope.task = {};
    $scope.tasks = [];

    Priority.all().then(function(response){
      $scope.priorities = response.data.priorities;
    });

    Task.all().then(function(response){
      $scope.tasks = response.data.tasks;
    });

    $scope.add = function(){
      // Task.create comes from the task FACTORY, NOT the model
      // $scope.task comes from the FORM
      Task.create($scope.task).then(function(response){
        $scope.tasks.push(response.data.task);
        $scope.task = {};
      });
    };

    $scope.toggleComplete = function(taskId){
      console.log(taskId);
    };
  }]);
})();
