angular.module('AccountApp')
    .controller('DashboardCtrl', ['$scope', function($scope) {
        $scope.apartments;
        $scope.$on('searchReturned', function(event, results){
            console.dir('HELLE');
            $scope.apartments = results;
        })
    }]);
