angular.module('AccountCreateApp')
.controller('AccountCreateCtrl', [
    '$scope',
    '$state',
    'UserRegistration',
    function($scope, $state, UserRegistration){
        $scope.radioModel = {
            realtor: false,
            tenant: true,
            broker: false
        };

        $scope.setUserObject = function(){
            var user = {
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                email: $scope.email,
                password: $scope.password
            };
            if ($scope.radioModel === "tenant") {
                user.userType = 1;
            } else if ($scope.radioModel === "realtor") {
                user.userType = 2;
            } else if ($scope.radioModel === "broker") {
                user.userType = 3;
            }

            UserRegistration.saveUser(user);
        };

    }
]);
