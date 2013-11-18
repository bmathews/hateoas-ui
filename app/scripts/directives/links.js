'use strict';

angular.module('hateoasUiApp')
.directive('links', [function () {

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
    'POST': 'btn-primary',
    'DELETE': 'btn-danger',
    'PUT': 'btn-success'
  };

  return {
    restrict: 'A',
    template: '<a ng-repeat="link in links" class="btn {{getBtnClass(link)}}" ng-show="showLink(link)" ng-click="linkClicked(link)" >{{getLinkText(link)}}</a>',
    scope: {
      links: '='
    },
    link: function (scope) {

      // get a button class based off the rel type
      scope.getBtnClass = function (link) {
        return btnClass[link.method] || 'btn-default';
      };

      // get a button class based off the rel type
      scope.linkClicked = function (link) {
        scope.$emit('linkClicked', link);
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