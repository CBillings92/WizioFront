angular.module('AccountApp')
    .controller('AccountUserInfoCtrl', [
        '$scope',
        '$timeout',
        'AuthFct',
        function($scope, $timeout, AuthFct) {
            //get account/user info from the currently active token.
            var accountInfo = AuthFct.getTokenClaims();
            //set timeout to wait for child controllers to load.
            $timeout(function() {
                $scope.$broadcast('AccountInfoBroadcast', accountInfo);
            });
            //get all the other apartment information
        }
    ])
    .controller('AccountMainCtrl', [
        '$scope',
        function($scope){
            alert('why');
        }
    ]);
