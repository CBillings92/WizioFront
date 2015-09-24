angular.module('SellerApp')
.controller('dashSellerInfoCtrl.js', [
    '$scope',
    function($scope){
        $scope.$on('AccountInfoBroadcast', function(event, data){
            $scope.accountInfo = data;
        });

    }
]);
