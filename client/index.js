(function(){
  'use strict';

  angular.module('quick-task', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/', {templateUrl:'/views/home/home.html', controller:'HomeCtrl'})
    .when('/', {templateUrl:'/views/priorities/priorities.html', controller:'PrioritiesCtrl'})
    .otherwise({redirectTo:'/'});
  }]);
})();
