angular.module('DashboardApp')
  .controller('ReassignToursCtrl', [
    '$scope',
    'ReassignToursFct',
    function($scope, ReassignToursFct) {
      $scope.activeListings = [];
      console.dir('inctrl');
      $scope.$on('ActiveListingsPayload', function(ev, data) {
        console.dir(data);
        $scope.activeListings = data[true];
      })
      $scope.$emit('ActiveListingRequest', {});
    }
  ])
