angular.module('AccountApp')
    .controller('UserInfoCtrl', ['$scope', function($scope) {
        $scope.test = 'hi';
        var accountInfo = {
            firstName: 'Cameron',
            lastName: 'Billings',
            email: 'Cameron.billings92@gmail.com'
        };
        $scope.accountInfo = accountInfo;
    }]);
