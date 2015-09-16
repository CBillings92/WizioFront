angular.module('BuyerApp')
.controller('DashBuyerInfoCtrl.js', [
    '$scope',
    function($scope){
        $scope.$on('AccountInfoBroadcast', function(event, data){
            $scope.accountInfo = data;
        });

    }
]);
