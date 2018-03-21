angular.module('meannasdaq').directive('mnSearch', mnSearch);

function mnSearch() {
  return {
    restrict: 'E',
    //can only be used as an element
    templateUrl: 'angular-app/stock-list/stock-list.html'
  };
}