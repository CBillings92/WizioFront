angular.module('AccountApp')
    .controller('AuthCreateAcctModalCtrl', [
        '$scope',
        '$state',
        '$modal',
        '$modalInstance',
        'ModalSvc',
        'data',
        'WizioConfig',
        'UserRegistrationSvc',
        function($scope, $state, $modal, $modalInstance, ModalSvc, data, WizioConfig, UserRegistrationSvc) {
            //Set a standard, local user object to save for local authentication
            $scope.user = {};

            $scope.backStep = function() {
                $modalInstance.close('backStep');
            };

            $scope.hasRegistered = false;

            $scope.closeModal = function() {
                return $modalInstance.close('ok');
            };

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
                            var signUpErrorModalOptions = {
                                closeButtonText: "Close",
                                actionButtonText: "OK",
                                headerText: "Email Not valid",
                                bodyText: 'That email is already in use by an account holder. Please try another email or reset your password if you forgot it.'
                            };
                            ModalSvc.showModal({}, signUpErrorModalOptions)
                                .then(function(result) {})
                        } else {
                            $scope.hasRegistered = true;
                        }

                    });
                } else {
                    var signUpPasswordErrorModalOptions = {
                        closeButtonText: "Close",
                        actionButtonText: "OK",
                        headerText: "Password Error",
                        bodyText: 'The two passwords you typed do not match'
                    };
                    ModalSvc.showModal({}, signUpPasswordErrorModalOptions)
                        .then(function(result) {})
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
