'use strict';

angular.module('hateoasUiApp')
  .controller('CollectionCtrl', ['$scope', '$rootScope', '$location',
    function ($scope, $rootScope, $location) {
      $scope.itemClick = function (item) {
        $location.url('view?res=' + item.uri);
      };
    }
  ]);