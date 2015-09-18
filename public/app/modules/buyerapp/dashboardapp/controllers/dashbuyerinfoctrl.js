angular.module('buyerApp')
.controller('dashBuyerInfoCtrl.js', [
    '$scope',
    function($scope){
        $scope.$on('AccountInfoBroadcast', function(event, data){
            $scope.accountInfo = data;
        });

    }
]);
