angular.module('AccountCreateApp')
.controller('AccountCreateCtrl', [
    '$scope',
    '$state',
    'registration',
    function($scope, $state, registration){
        $scope.radioModel = {
            realtor: false,
            tenant: true,
            broker: false
        };
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
                if(data.userType === 1){

                } else if (data.userType === 2){

                } else if (data.userType === 3) {
                    $state.go('BrokerAdditionalInfo');
                }
            });
        };

    }
]);
