angular.module('AuthApp')
.controller('AccountCreateCtrl', [
    '$scope',
    '$state',
    '$modalInstance',
    'UserRegistrationSvc',
    function($scope, $state, $modalInstance, UserRegistrationSvc){
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

            userRegistration.saveUser(user, function(data){
                if($state.current.name === "Campaign.VideoUpload.Main"){
                    $modalInstance.close('ok');
                } else {
                    $state.go('Account.Dashboard');
                }
            });
        };

        $scope.cancel = function(){
            if($state.current.name === "CAmpaign.VideoUpload.Main"){
                $modalInstance.dismiss();
            } else {
                $state.go('Home');
            }
        };

    }
]);
