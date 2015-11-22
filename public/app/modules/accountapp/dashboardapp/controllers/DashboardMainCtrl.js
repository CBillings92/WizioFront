angular.module('AccountApp')
    .controller('DashboardMainCtrl', [
        '$scope',
        '$timeout',
        'TokenSvc',
        function($scope, $timeout, TokenSvc) {
            //get account/user info from the currently active token.
            var accountInfo = TokenSvc.decode();
            //set timeout to wait for child controllers to load.
            $timeout(function() {
                $scope.$broadcast('AccountInfoBroadcast', accountInfo);
            });
            //get all the other apartment information
        }
    ]);
