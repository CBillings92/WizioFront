angular.module('AccountApp')
    .directive('activeListingListDir', function() {
        return {
            templateUrl: 'public/app/modules/activelistingsapp/list/activelisting.list.view.html',
            controller: 'ActiveListingListCtrl',
            scope: {
                activelistings: '=activelistings'
            },
            restrict: 'EA'
        };
    });
