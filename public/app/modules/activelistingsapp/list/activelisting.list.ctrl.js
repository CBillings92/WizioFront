angular.module('AccountApp')
    .controller('ActiveListingListCtrl', ['$scope', function($scope) {
        new Clipboard('.clipboard');
        $scope.windowLocationOrigin = window.location.origin;
    }]);
