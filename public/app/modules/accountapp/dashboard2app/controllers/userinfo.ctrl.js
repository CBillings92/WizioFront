angular.module('AccountApp')
    .controller('UserInfoCtrl', [
        '$scope',
        'TokenSvc',
        function($scope, TokenSvc) {
        $scope.accountInfo = TokenSvc.decode();
    }]);
