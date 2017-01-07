angular.module('AccountApp')
    .controller('DashboardCtrl', ['$scope', 'TokenSvc', 'LoadingSpinnerFct', function($scope, TokenSvc, LoadingSpinnerFct) {
        $scope.apartments = null;
        $scope.loading=false;
        $scope.activelistings = TokenSvc.decode().ActiveListings;
        $scope.$on('searchReturned', function(event, results) {
            LoadingSpinnerFct.hide('account-dashboard-searh-loader')
            $scope.apartments = results;
            $scope.loading=false;
        });
        $scope.$on('Unit-Activated', function(event, results) {
          $scope.activelistings.push({pubid: results.pubid, Apartment: {concatAddr: results.apartment.concatAddr, unitNum: results.apartment.unitNum}})
      });
      $scope.$on('searchInitiated', function (event, name) {
          $scope.loading = true;
      })
    }]);
