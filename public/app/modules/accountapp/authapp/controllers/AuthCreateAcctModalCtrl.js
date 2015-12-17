angular.module('AccountApp')
    .controller('AuthCreateAcctModalCtrl', [
        '$scope',
        '$state',
        '$modal',
        '$modalInstance',
        'data',
        'WizioConfig',
        'UserRegistrationSvc',
        function($scope, $state, $modal, $modalInstance, data, WizioConfig, UserRegistrationSvc) {
            //Set a standard, local user object to save for local authentication
            $scope.user = {};

            $scope.backStep = function() {
                $modalInstance.close('backStep');
            }

            $scope.hasRegistered = false

            $scope.closeModal = function() {
                return $modalInstance.close('ok');
            }

            $scope.setUserObj = function() {
                if ($scope.user.password === $scope.user.passwordConfirm) {
                    $scope.user.accountType = 'local';
                    if(data === "Tenant"){
                        $scope.user.userType = 1;
                    } else {
                        $scope.user.userType = 2;
                    }
                    UserRegistrationSvc.saveUser($scope.user, function(data) {
                        if (data.status === "ERR") {
                            alert("Email already in use! Please try another or login");
                        } else {
                            $scope.hasRegistered = true;
                        }

                    });
                } else {
                    alert("Passwords don't match!");
                }
            };
            $scope.login = function() {
                return $modalInstance.close('login');
            };
            /*    $scope.createFacebookUser = function(){
                        $facebook.login().then(function(data){
                            switch(data.status){
                                case "connected":
                                    $facebook.api('/me').then(function(user){
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

            $scope.cancel = function() {
                if ($state.current.name === "Campaign.VideoUpload.Main") {
                    $modalInstance.dismiss();
                } else {
                    $state.go('Home');
                }
            };

        }
    ]);
