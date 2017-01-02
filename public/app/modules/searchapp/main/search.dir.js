angular.module('SearchApp')
    .directive('searchDirv', function() {
        return {
            templateUrl: 'public/app/modules/searchapp/main/search.view.html',
            controller: 'SearchCtrl',
            scope: {},
            restrict: 'EA'
        };
    });
