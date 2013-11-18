'use strict';

angular.module('hateoasUiApp', [
  'ngRoute',
  'ui.bootstrap'
])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/view', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: function () {
          return '/view?res=application';
        }
      });
  }]);