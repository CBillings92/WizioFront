angular.module('AccountApp')
.controller('AuthCreateAcctModalCtrl', [
    '$scope',
    '$state',
    '$modalInstance',
    'UserRegistrationSvc',
    function($scope, $state, $modalInstance, UserRegistrationSvc){
        //Set a standard, local user object to save for local authentication
        $scope.user = {};
        $scope.setUserObj = function() {
            if($scope.user.password === $scope.user.passwordConfirm){
                $scope.user.accountType = 'local';
                $scope.user.userType = 1;
                UserRegistrationSvc.saveUser($scope.user, function(data) {
                    if(data.status === "ERR"){
                        alert("Email already in use! Please try another or login");
                    } else {
                        return $modalInstance.close('ok');
                    }

                });
            } else {
                alert("Passwords don't match!");
            }

        };
    /*    $scope.createFacebookUser = function(){
                $facebook.login().then(function(data){
                    switch(data.status){
                        case "connected":
                            $facebook.api('/me').then(function(user){
                                console.dir(user);
                                user.accountType = "facebook";
                                UserRegistrationSvc.saveUser(user, function(data){
                                    return $modalInstance.close('ok');
                                });
                            });
                            break;
                        case "not_authorized":
                            alert('Facebook error');
                            break;
                    }
                });

        };*/

        $scope.cancel = function(){
            if($state.current.name === "Campaign.VideoUpload.Main"){
                $modalInstance.dismiss();
            } else {
                $state.go('Home');
            }
        };

    }
]);
