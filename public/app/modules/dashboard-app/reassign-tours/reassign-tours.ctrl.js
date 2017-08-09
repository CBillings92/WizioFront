angular.module('DashboardApp')
  .controller('ReassignToursCtrl', [
    '$scope',
    'ReassignToursFct',
    function($scope, ReassignToursFct) {
      $scope.activeListings = [];
      $scope.$on('ActiveListingsPayload', function(ev, data) {
        $scope.activeListings = data[true];
      })
      $scope.$emit('ActiveListingRequest', {});
    }
  ])
