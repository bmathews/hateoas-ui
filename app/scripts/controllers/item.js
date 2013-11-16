'use strict';

angular.module('hateoasUiApp')
  .controller('ItemCtrl', ['$scope', '$rootScope', '$location', '$http',
    function ($scope, $rootScope, $location, $http) {
      if ($location.search().edit) {
        $scope.edit = true;
        $http.get('/api/' + $location.search().edit)
        .success(function (res) {
          $scope.schema = res;
        })
        .error(function (res) {
          console.error(res);
        });
      }
      $scope.saveEdit = function () {
        var href;
        $scope.response.links.forEach(function (link) {
          if (link.rel === 'schema/rel/edit') {
            href = link.href;
          }
        });
        $http.put('/api/' + href, $scope.response.data)
        .success(function () {
          $location.search('edit', null);
        })
        .error(function (res) {
          console.error(res);
        });
      };

      $scope.remove = function () {
        var href;
        $scope.response.links.forEach(function (link) {
          if (link.rel === 'schema/rel/remove') {
            href = link.href;
          }
        });
        $http['delete']('/api/' + href)
        .success(function (res) {
          console.log(res);
        })
        .error(function (res) {
          console.error(res);
        });
      };

      $scope.cancelEdit = function () {
        $location.search('edit', null);
      };
    }
  ]);