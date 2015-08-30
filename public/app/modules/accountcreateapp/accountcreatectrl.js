angular.module('AccountCreateApp')
.controller('AccountCreateCtrl', [
    '$rootScope',
    '$scope',
    '$state',
    '$localStorage',
    'registration',
    function($rootScope, $scope, $state, $localStorage, registration){
        $scope.radioModel = {
            realtor: false,
            tenant: true,
            broker: false
        };
    function successAuth(res){
        console.dir("in success auth!");
        $localStorage.token = res;
        $rootScope.isLoggedIn = true;
        $state.go('UserAccount');
    }
        $scope.setUserObject = function(){
            var userData = {
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                email: $scope.email,
                password: $scope.password
            };
            console.dir("in setUserObj");
            if($scope.radioModel === "tenant"){
                userData.userType = 1;
            } else if ($scope.radioModel === "realtor"){
                userData.userType = 2;
            } else if ($scope.radioModel === "broker"){
                userData.userType = 3;
            } else {
                alert("No user selected!");
            }

            registration.save(userData, function(data){
                console.dir(data);
                if(userData.userType === 1){
                    successAuth(data.data);

                } else if (userData.userType === 2){

                } else if (userData.userType === 3) {
                    $state.go('BrokerAdditionalInfo');
                }
            });
        };

    }
]);
