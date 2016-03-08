angular.module('AccountApp')
.controller('DashboardUserInfoCtrl', [
    '$scope',
    '$state',
    'TokenSvc',
    function($scope, $state, TokenSvc){
        $scope.accountInfo = TokenSvc.decode();
        console.dir(TokenSvc.decode());

        $scope.claimApartments = function(){
            $state.go('Unit.Claim');
        };
    }
]);
