'use strict';


/**
 * Handles viewing/editing/creating an item.
 */
angular.module('hateoasUiApp')
  .controller('ItemCtrl', ['$scope', '$rootScope', '$location', '$http',
    function ($scope, $rootScope, $location, $http) {

      // set flags for the view to use
      $scope.editOrCreate = !!($location.search().edit || $location.search().create);

      // if we're in create mode, create a fake base
      if ($location.search().create) {
        $scope.response = { data: {} };
      }

      // if we're in edit or create mode, fetch the model
      if ($scope.editOrCreate && $location.search().model) {
        $http.get('/api/' + $location.search().model)
          .success(function (res) {
            $scope.schema = res;
          })
          .error(function (res) {
            console.error(res);
          });
      }

      // make sure a url doesn't have a leading slash
      function normalizeUrl(url) {
        return (url.indexOf('/') === 0 ? url.substr(1) : url);
      }

      // navigate to the item's collection
      function goToCollection() {
        var links = $scope.response.links || $scope.schema.links;
        links.forEach(function (link) {
          if (link.rel === 'schema/rel/collection') {
            $location.url('/view?res=' + normalizeUrl(link.href));
          }
        });
      }

      /**
       * Handle a link being clicked.
       */
      $scope.$on('linkClicked', function (e, link) {
        switch (link.method) {
        case 'DELETE':
          $scope.remove(link);
          break;
        case 'PUT':
          $location.search({'res': normalizeUrl(link.href), 'edit': true, 'model': normalizeUrl(link.schema.$ref)});
          break;
        default:
          $location.url('/view?res=' + normalizeUrl(link.href));
        }
      });

      /**
       * Save an item (put/post depending on edit/create mode)
       */
      $scope.save = function () {
        var href = $location.search().res || $location.search().create,
            method = $location.search().create ? 'post' : 'put';

        $http[method]('/api/' + href, $scope.response.data)
          .success(function (res) {
            // now view the item
            res.links.forEach(function (link) {
              if (link.rel === 'schema/rel/self') {
                $location.url('/view?res=' + normalizeUrl(link.href));
              }
            });
          })
          .error(function (res) {
            console.error(res);
          });
      };

      /**
       * Remove an item. If successful, go to collection.
       */
      $scope.remove = function (link) {
        $http['delete']('/api/' + normalizeUrl(link.href))
          .success(function () {
            goToCollection();
          })
          .error(function (res) {
            console.error(res);
          });
      };

      /**
       * Cancel editing/creating an item, go back to viewing or parent collection.
       */
      $scope.cancel = function () {
        if ($location.search().create) {
          $location.url('/view?res=' + $location.search().create);
        } else {
          $location.search('edit', null);
        }
      };
    }
  ]);