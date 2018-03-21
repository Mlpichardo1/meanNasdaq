angular.module('meannasdaq').directive('mdNavigation', mdNavigation);

function mdNavigation() {
  return {
    restrict: 'E',
    templateUrl: 'angular-app/navbar/nav-directive.html'
  };
}