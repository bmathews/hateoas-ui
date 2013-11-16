'use strict';

angular.module('hateoasUiApp')
  .controller('MainCtrl', ['$scope', '$location', '$http',
    function ($scope, $location, $http) {
      var resource = $location.search().res;

      $http.get('/api' + resource)
      .success(function (res) {
        $scope.response = res;
      })
      .error(function (res) {
        console.error(res);
      });
    }
  ]);