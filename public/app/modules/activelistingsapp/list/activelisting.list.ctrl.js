angular.module('AccountApp')
    .controller('ActiveListingListCtrl', ['$scope', function($scope) {
        $scope.windowLocationOrigin = window.location.origin;
    }]);
