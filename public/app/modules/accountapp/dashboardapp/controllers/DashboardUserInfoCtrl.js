angular.module('AccountApp')
.controller('DashboardUserInfoCtrl', [
    '$scope',
    'TokenSvc',
    function($scope, TokenSvc){
        $scope.accountInfo = TokenSvc.decode();
        console.dir(TokenSvc.decode());

    }
]);
