'use strict';

angular.module('hateoasUiApp')
  .controller('CollectionCtrl', ['$scope', '$rootScope', '$location',
    function ($scope, $rootScope, $location) {
      /**
       * Handle a link being clicked.
       */
      $scope.$on('linkClicked', function (e, link) {
        switch (link.method) {
        case 'POST':
          $location.url(
            '/view?model=' + (link.schema.$ref.indexOf('/') === 0 ? link.schema.$ref.substr(1) : link.schema.$ref) +
            '&create=' + (link.href.indexOf('/') === 0 ? link.href.substr(1) : link.href)
          );
          break;
        default:
          $location.url('/view?res=' + (link.href.indexOf('/') === 0 ? link.href.substr(1) : link.href));
        }
      });

      /**
       * Handle an item in the collection being clicked.
       */
      $scope.itemClick = function (item) {
        $location.url('view?res=' + item.uri);
      };
    }
  ]);