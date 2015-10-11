angular.module('AccountApp')
    .controller('AuthCreateAcctCtrl', [
        '$scope',
        '$state',
        'UserRegistrationSvc',
        function($scope, $state, UserRegistrationSvc) {
            $scope.setUserObject = function() {
                var user = {
                    firstName: $scope.firstName,
                    lastName: $scope.lastName,
                    email: $scope.email,
                    password: $scope.password
                };
                UserRegistrationSvc.saveUser(user, function(data) {
                    $state.go('Account.Dashboard');
                });
            };

            $scope.cancel = function() {
                $state.go('Home');
            };

        }
    ]);
