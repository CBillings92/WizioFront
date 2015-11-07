angular.module('AccountApp')
.controller('DashboardUserInfoCtrl', [
    '$scope',
    function($scope){
        $scope.$on('AccountInfoBroadcast', function(event, data){
            console.dir(data);
            $scope.accountInfo = data;
        });

    }
]);
