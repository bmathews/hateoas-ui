'use strict';

angular.module('hateoasUiApp')
.directive('links', ['$location', function ($location) {

  var name = {
    'schema/rel/self': 'Refresh',
    'schema/rel/up': 'Back',
    'schema/rel/collection': 'Parent List',
    'schema/rel/create': 'Create',
    'schema/rel/edit': 'Edit'
  };

  var hide = {
    'schema/rel/monitor': true,
    'schema/rel/item': true,
    'schema/rel/self': true
  };

  var btnClass = {
    'schema/rel/create': 'btn-primary',
    'schema/rel/remove': 'btn-danger',
    'schema/rel/edit': 'btn-success'
  };

  var normalizeUrl = function (url) {
    return url.indexOf('/') === 0 ? url.substr(1) : url;
  };

  return {
    restrict: 'A',
    template: '<a ng-repeat="link in links" class="btn {{getBtnClass(link)}}" ng-show="showLink(link)" ng-click="clickLink(link)" >{{getLinkText(link)}}</a>',
    scope: {
      links: '='
    },
    link: function (scope) {

      // get a button class based off the rel type
      scope.getBtnClass = function (link) {
        return btnClass[link.rel] || 'btn-default';
      };

      // get a button class based off the rel type
      scope.clickLink = function (link) {
        if (link.method === 'PUT') {
          $location.search('edit', link.schema.$ref);
        } else {
          $location.url('/view?res=/' + normalizeUrl(link.href));
        }
      };

      // show/hide a link based off the rel type
      scope.showLink = function (link) {
        return !hide[link.rel];
      };

      // get a friendly label for a link
      scope.getLinkText = function (link) {
        var text = name[link.rel];
        if (!text) {
          var split = link.rel.split('/');
          text = split[split.length - 1].split('-').map(function (part) { return part.substr(0,1).toUpperCase() + part.substr(1); }).join(' ');
        }
        return text;
      };
    }
  };
}]);