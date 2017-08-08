angular.module('DashboardApp')
  .controller('ReassignToursCtrl', [
    '$scope',
    'ReassignToursFct',
    function($scope, ReassignToursFct) {
      $scope.activeListings = [];
<<<<<<< HEAD
      $scope.$on('ActiveListingsPayload', function(ev, data) {
=======
      console.dir('inctrl');
      $scope.$on('ActiveListingsPayload', function(ev, data) {
        console.dir(data);
>>>>>>> reassignment of tours from dashboard
        $scope.activeListings = data[true];
      })
      $scope.$emit('ActiveListingRequest', {});
    }
  ])
