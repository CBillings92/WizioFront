angular.module('AccountApp')
    .controller('ActiveListingListCtrl', ['$scope', function($scope) {
        new Clipboard('.clipboard');
        $scope.windowLocationOrigin = window.location.origin;
        $scope.openInNewPage = function(pubid){
          window.open($scope.windowLocationOrigin + '/tour/' + pubid, '_blank');
        }
    }]);
