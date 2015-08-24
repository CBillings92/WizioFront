angular.module('AccountCreateApp')
.controller('AccountCreateCtrl', [
    '$scope',
    'registration',
    function($scope, registration){
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
                console.dir($scope.radioModel);
            } else if ($scope.radioModel === "realtor"){
                console.dir($scope.radioModel);
            } else if ($scope.radioModel === "broker"){
                console.dir($scope.radioModel);
            } else {
                alert("No user selected!");
            }

            registration.save(userData, function(status, data){
                console.dir("in registration");
                if(data.userType === 1){

                } else if (data.userType === 2){

                } else {

                }
            });
        };

    }
]);
