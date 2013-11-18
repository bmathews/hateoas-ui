'use strict';

angular.module('hateoasUiApp')
  .controller('MainCtrl', ['$scope', '$location', '$http',
    function ($scope, $location, $http) {

      // make sure a url doesn't have a leading slash
      function normalizeUrl(url) {
        return (url.indexOf('/') === 0 ? url.substr(1) : url);
      }

      var resource = $location.search().res;
      if (resource) {
        $http.get('/api/' + normalizeUrl(resource))
          .success(function (res) {
            $scope.loaded = true;
            $scope.response = res;
          })
          .error(function (res) {
            console.error(res);
          });
      } else {
        $scope.loaded = true;
      }
    }
  ]);