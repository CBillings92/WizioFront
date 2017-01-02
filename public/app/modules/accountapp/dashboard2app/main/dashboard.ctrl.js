angular.module('AccountApp')
    .controller('DashboardCtrl', ['$scope', 'TokenSvc', function($scope, TokenSvc) {
        $scope.apartments;
        console.dir(TokenSvc.decode());
        $scope.activelistings = TokenSvc.decode().ActiveListings;
        $scope.$on('searchReturned', function(event, results){
            console.dir('HELLE');
            $scope.apartments = results;
        })
    }]);
