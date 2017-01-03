angular.module('AccountApp')
    .controller('DashboardCtrl', ['$scope', 'TokenSvc', function($scope, TokenSvc) {
        $scope.apartments = null;
        $scope.activelistings = TokenSvc.decode().ActiveListings;
        $scope.$on('searchReturned', function(event, results) {
            console.dir('HELLE');
            $scope.apartments = results;
        });
        $scope.$on('Unit-Activated', function(event, results) {
          console.dir(results);
          $scope.activelistings.push({pubid: results.pubid, Apartment: {concatAddr: results.apartment.concatAddr, unitNum: results.apartment.unitNum}})
        })
    }]);
