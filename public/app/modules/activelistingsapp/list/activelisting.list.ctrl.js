angular.module('AccountApp')
    .controller('ActiveListingListCtrl', ['$scope', function($scope) {
      alert('works');
      $scope.windowLocationOrigin = window.location.origin;
    }])
