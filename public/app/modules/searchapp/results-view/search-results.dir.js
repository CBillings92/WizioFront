angular.module('SearchApp')
    .directive('searchResultsListDir', function() {
      return {
        templateUrl: 'public/app/modules/searchapp/results-view/search-results.view.html',
        controller: 'SearchResultsListCtrl',
        scope: {
        },
        restrict: 'EA'
      }
    })
