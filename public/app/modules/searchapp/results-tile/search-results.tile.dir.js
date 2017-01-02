angular.module('SearchApp')
    .directive('searchResultsTileDir', function() {
        return {
            templateUrl: 'public/app/modules/searchapp/results-tile/search-results.tile.html',
            controller: 'SearchResultsTileCtrl',
            scope: {
                apartment: '=apartment'
            },
            restrict: 'EA'
        };
    });
