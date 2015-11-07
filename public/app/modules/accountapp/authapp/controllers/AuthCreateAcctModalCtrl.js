angular.module('AccountApp')
.controller('AuthCreateAcctModalCtrl', [
    '$scope',
    '$state',
    '$modalInstance',
    'UserRegistrationSvc',
    function($scope, $state, $modalInstance, UserRegistrationSvc){
        $scope.setUserObject = function(){
            var user = {
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                email: $scope.email,
                password: $scope.password
            };
            UserRegistrationSvc.saveUser(user, function(data){
                $modalInstance.close('ok');
            });
        };

        $scope.cancel = function(){
            if($state.current.name === "Campaign.VideoUpload.Main"){
                $modalInstance.dismiss();
            } else {
                $state.go('Home');
            }
        };

    }
]);
