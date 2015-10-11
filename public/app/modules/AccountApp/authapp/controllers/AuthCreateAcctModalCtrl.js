angular.module('AccountApp')
.controller('AuthCreateAcctModalCtrl', [
    '$scope',
    '$state',
    '$modalInstance',
    'UserRegistrationSvc',
    function($scope, $state, $modalInstance, UserRegistrationSvc){
        console.dir('in the right place');
        $scope.setUserObject = function(){
            var user = {
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                email: $scope.email,
                password: $scope.password
            };
            console.dir('SO CLOSE');
            UserRegistrationSvc.saveUser(user, function(data){
                console.dir("hello");
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
